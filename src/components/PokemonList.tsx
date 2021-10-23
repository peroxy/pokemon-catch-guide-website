import { getAuthorizationHeader, Pokemon } from '../api/api';
import { useStore } from '../Store';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Checkbox,
  Input,
  Link,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useState } from 'react';

export const PokemonList = (): JSX.Element => {
  const store = useStore();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchNumber, setSearchNumber] = useState<number | undefined>();
  const [searchName, setSearchName] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<'all' | 'missing' | 'caught'>('all');

  const { isLoading, error, isFetching } = useQuery<Pokemon[], Error>(['pokemonList', store.generation], async () => {
    const { data } = await axios.get<Pokemon[]>(
      `${store.apiUrl}/pokemon/generations/${store.generation}`,
      getAuthorizationHeader(store.password)
    );
    setPokemonList(data);
    return data;
  });

  const mutation = useMutation((newPokemon: { id: number; caught: boolean }) => {
    return axios.post(
      `${store.apiUrl}/pokemon/${newPokemon.id}/caught/${newPokemon.caught ? 1 : 0}`,
      null,
      getAuthorizationHeader(store.password)
    );
  });

  const searchBar = (
    <SimpleGrid columns={3}>
      <Input type={'number'} placeholder={'search #'} onChange={(event) => setSearchNumber(parseInt(event.currentTarget.value))} />
      <Input type={'text'} placeholder={'search name'} onChange={(event) => setSearchName(event.currentTarget.value)} />
      <Select onChange={(event) => setStatusFilter(event.currentTarget.value as 'all' | 'caught' | 'missing')}>
        <option value={'all'}>Show all</option>
        <option value={'caught'}>Caught</option>
        <option value={'missing'}>Missing</option>
      </Select>
    </SimpleGrid>
  );

  const generationBar = (
    <Center margin={'1vh'}>
      <Select width={'md'} defaultValue={store.generation} onChange={(event) => store.setGeneration(parseInt(event.currentTarget.value))}>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <option value={value}>Generation {value}</option>
        ))}
      </Select>
    </Center>
  );

  if (isLoading || isFetching) {
    return (
      <>
        {generationBar}
        {searchBar}
        <Center minHeight={'50vh'}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      </>
    );
  }

  if (error || mutation.isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error fetching data!</AlertTitle>
        <AlertDescription>
          {error && error.message}
          {mutation.isError && mutation.error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {generationBar}
      {searchBar}
      <Table size="md">
        <Thead>
          <Tr>
            <Th isNumeric>#</Th>
            <Th>Name</Th>
            <Th textAlign={'center'}>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pokemonList.map((pokemon, i) => {
            let show: boolean = false;
            if (
              (statusFilter === 'caught' && pokemon.caught) ||
              (statusFilter === 'missing' && !pokemon.caught) ||
              statusFilter === 'all'
            ) {
              show = true;
            }
            if ((searchName && !pokemon.name.includes(searchName)) || (searchNumber && pokemon.dex_id !== searchNumber)) {
              show = false;
            }
            return show ? (
              <Tr>
                <Td isNumeric>{pokemon.dex_id}</Td>
                <Td textTransform={'capitalize'}>
                  <Link href={`pokemon/details/${pokemon.id}`}>{pokemon.name}</Link>
                </Td>
                <Td textAlign={'center'}>
                  {mutation.isLoading && mutation?.variables?.id === pokemon.id ? (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="sm" />
                  ) : (
                    <Checkbox
                      size={'lg'}
                      defaultIsChecked={pokemon.caught}
                      colorScheme={pokemon.caught ? 'green' : 'red'}
                      onChange={(event) => {
                        mutation.mutate({ caught: event.target.checked, id: pokemon.id });
                        let updatedPokemonList = [...pokemonList];
                        updatedPokemonList[i].caught = event.target.checked;
                        setPokemonList(updatedPokemonList);
                      }}
                    />
                  )}
                </Td>
              </Tr>
            ) : null;
          })}
        </Tbody>
      </Table>
    </>
  );
};
