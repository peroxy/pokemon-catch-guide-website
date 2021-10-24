import { useMutation, useQuery } from 'react-query';
import { Encounter, getAuthorizationHeader, Pokemon } from '../api/api';
import axios from 'axios';
import { useStore } from '../Store';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  AvatarBadge,
  Badge,
  Center,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import { EncounterList } from './EncounterList';

export interface PokemonDetailsProps {
  pokemonId: number;
  hideEncounters?: boolean;
}
export const PokemonDetails = (props: PokemonDetailsProps) => {
  const store = useStore();

  const { isLoading, error, isFetching, data } = useQuery<{ details: Pokemon; encounters: Encounter[] }, Error>(
    ['pokemonDetails', props.pokemonId, props.hideEncounters],
    async () => {
      const pokemon = await axios.get<Pokemon>(`${store.apiUrl}/pokemon/${props.pokemonId}`, getAuthorizationHeader(store.password));
      const encounters = await axios.get<Encounter[]>(
        `${store.apiUrl}/pokemon/${props.pokemonId}/encounters`,
        getAuthorizationHeader(store.password)
      );
      return { details: pokemon.data, encounters: encounters.data };
    }
  );

  const mutation = useMutation((newPokemon: { id: number; caught: boolean }) => {
    return axios.post(
      `${store.apiUrl}/pokemon/${newPokemon.id}/caught/${newPokemon.caught ? 1 : 0}`,
      null,
      getAuthorizationHeader(store.password)
    );
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

  return (
    <Center marginTop={'1em'}>
      <VStack spacing={'1rem'}>
        <Avatar
          size={'2xl'}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.details.dex_id}.png`}
          name={data?.details.name}
          bg={'gray.300'}
        >
          <AvatarBadge boxSize={'0.8em'} bg={'gray.300'} borderWidth={'0px'} boxShadow={'0px 0px 5px 3px rgba(0,0,0,0.5)'}>
            <Text fontSize={'sm'} fontWeight={'bold'} color={'blackAlpha.700'}>
              #{data?.details.dex_id}
            </Text>
          </AvatarBadge>
        </Avatar>
        <Divider width={'85vw'} borderWidth={'2px'} />
        <VStack minWidth={'85vw'}>
          <Text fontWeight={'bold'} textTransform={'capitalize'}>
            {data?.details.name}
            {data?.encounters[0].is_baby && (
              <Badge ml={'1'} colorScheme={'green'}>
                Baby
              </Badge>
            )}
          </Text>
          <Divider m={1} />
          <HStack spacing={'1em'}>
            {data?.encounters[0].evolution_trigger && <Badge>{data?.encounters[0].evolution_trigger}</Badge>}
            {data?.encounters[0].evolution_method && <Badge>{data?.encounters[0].evolution_method}</Badge>}
          </HStack>
          <Text>Generation {data?.details.generation}</Text>
          <Divider m={1} />
          <HStack>
            <Badge colorScheme={data?.details.caught ? 'green' : 'red'}>{data?.details.caught ? 'CAUGHT' : 'MISSING'}</Badge>
            <Divider orientation={'vertical'} />
            <Checkbox
              size={'lg'}
              defaultIsChecked={data?.details.caught}
              colorScheme={data?.details.caught ? 'green' : 'red'}
              onChange={(event) => {
                mutation.mutate({ caught: event.target.checked, id: data!!.details.id });
                data!!.details.caught = event.target.checked;
              }}
            />
          </HStack>
        </VStack>
        {!props.hideEncounters && <Divider width={'85vw'} borderWidth={'2px'} />}
        {!props.hideEncounters && <Heading size={'sm'}>Encounters</Heading>}
        {!props.hideEncounters && data && <EncounterList showPokemonName={false} showLocation encounters={data.encounters} />}
      </VStack>
    </Center>
  );
};
