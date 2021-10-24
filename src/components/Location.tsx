import { useStore } from '../Store';
import { useQuery } from 'react-query';
import { Encounter, getAuthorizationHeader, Pokemon } from '../api/api';
import axios from 'axios';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Heading, Spinner } from '@chakra-ui/react';
import { EncounterList } from './EncounterList';
import { PokemonEncounters } from './PokemonEncounters';

export interface LocationProps {
  name: string;
}

export const Location = (props: LocationProps) => {
  const store = useStore();

  const encountersQuery = useQuery<Encounter[], Error>(['location', props.name], async () => {
    const encounters = await axios.get<Encounter[]>(
      `${store.apiUrl}/locations/${props.name}/generations/${store.generation}/encounters`,
      getAuthorizationHeader(store.password)
    );
    return encounters.data;
  });

  const pokemonQuery = useQuery<Pokemon[], Error>(['pokemonList', store.generation], async () => {
    const { data } = await axios.get<Pokemon[]>(
      `${store.apiUrl}/pokemon/generations/${store.generation}`,
      getAuthorizationHeader(store.password)
    );
    return data;
  });

  if (encountersQuery.isLoading || encountersQuery.isFetching || pokemonQuery.isLoading || pokemonQuery.isFetching) {
    return (
      <Center minHeight={'50vh'}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  if (encountersQuery.error || pokemonQuery.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error fetching data!</AlertTitle>
        <AlertDescription>
          {(encountersQuery.error && encountersQuery.error.message) || (pokemonQuery.error && pokemonQuery.error.message)}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Center mt={'1rem'}>
        <Heading textTransform={'capitalize'}>{props.name.replaceAll('-', ' ')}</Heading>
      </Center>
      <PokemonEncounters pokemonList={pokemonQuery.data!!} encounters={encountersQuery.data!!} />
      <EncounterList encounters={encountersQuery.data!!} showLocation={false} showPokemonName />
    </>
  );
};
