import { useStore } from '../Store';
import { useQuery } from 'react-query';
import { Encounter, getAuthorizationHeader } from '../api/api';
import axios from 'axios';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Spinner } from '@chakra-ui/react';
import { EncounterList } from './EncounterList';

export interface LocationProps {
  name: string;
}
export const Location = (props: LocationProps) => {
  const store = useStore();

  const { isLoading, error, isFetching, data } = useQuery<Encounter[], Error>(['location', props.name], async () => {
    const encounters = await axios.get<Encounter[]>(
      `${store.apiUrl}/locations/${props.name}/generations/${store.generation}/encounters`,
      getAuthorizationHeader(store.password)
    );
    return encounters.data;
  });

  if (isLoading || isFetching) {
    return (
      <Center minHeight={'50vh'}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error fetching data!</AlertTitle>
        <AlertDescription>{error && error.message}</AlertDescription>
      </Alert>
    );
  }

  return <EncounterList encounters={data!!} showLocation={false} showPokemonName />;
};
