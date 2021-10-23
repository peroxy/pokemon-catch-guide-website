import { useQuery } from 'react-query';
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
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Link,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import { EncounterList } from './EncounterList';

export interface PokemonDetailsProps {
  pokemonId: number;
}
export const PokemonDetails = (props: PokemonDetailsProps) => {
  const store = useStore();

  const { isLoading, error, isFetching, data } = useQuery<{ details: Pokemon; encounters: Encounter[] }, Error>(
    ['pokemonDetails', props.pokemonId],
    async () => {
      const pokemon = await axios.get<Pokemon>(`${store.apiUrl}/pokemon/${props.pokemonId}`, getAuthorizationHeader(store.password));
      const encounters = await axios.get<Encounter[]>(
        `${store.apiUrl}/pokemon/${props.pokemonId}/encounters`,
        getAuthorizationHeader(store.password)
      );
      return { details: pokemon.data, encounters: encounters.data };
    }
  );

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
        <Link href={'/pokemon'}>
          <Button>Go back</Button>
        </Link>

        <Divider width={'85vw'} borderWidth={'2px'} />
        <Avatar
          size={'2xl'}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.details.dex_id}.png`}
          name={data?.details.name}
          bg={'gray.300'}
        >
          <AvatarBadge boxSize={'1em'} bg={'gray.300'} borderWidth={'5px'}>
            <Text fontSize={'sm'} fontWeight={'bold'} color={'blackAlpha.700'}>
              #{data?.details.dex_id}
            </Text>
          </AvatarBadge>
        </Avatar>
        <Box>
          <Text fontWeight={'bold'} textTransform={'capitalize'}>
            {data?.details.name}
            <Badge ml="1" colorScheme={data?.details.caught ? 'green' : 'red'}>
              {data?.details.caught ? 'CAUGHT' : 'MISSING'}
            </Badge>
            {data?.encounters[0].is_baby && <Badge colorScheme={'green'}>Baby</Badge>}
          </Text>

          <HStack spacing={'1em'}>
            {data?.encounters[0].evolution_trigger && <Badge>{data?.encounters[0].evolution_trigger}</Badge>}
            {data?.encounters[0].evolution_method && <Badge>{data?.encounters[0].evolution_method}</Badge>}
          </HStack>
          <Text>Generation {data?.details.generation}</Text>
        </Box>
        <Divider width={'85vw'} borderWidth={'2px'} />
        <Heading size={'sm'}>Encounters</Heading>
        {data && <EncounterList encounters={data.encounters} />}
      </VStack>
    </Center>
  );
};
