import { getAuthorizationHeader, Pokemon, PokemonApi } from '../api/api';
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

  const { isLoading, error } = useQuery<Pokemon[], Error>('pokemonList', async () => {
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

  if (isLoading) {
    return (
      <Center minHeight={'50vh'}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
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
    <Table size="md">
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pokemonList.map((pokemon, i) => (
          <Tr>
            <>
              <Td isNumeric>{pokemon.dex_id}</Td>
              <Td textTransform={'capitalize'}>{pokemon.name}</Td>
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
            </>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
