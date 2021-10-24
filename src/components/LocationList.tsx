import { useStore } from '../Store';
import { useQuery } from 'react-query';
import { getAuthorizationHeader, Location } from '../api/api';
import axios from 'axios';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Input,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTitle } from '../util/hooks';
import { GenerationSelect } from './GenerationSelect';
import { locationToHuman } from '../util/pokemonUtils';

export const LocationList = () => {
  const store = useStore();
  useTitle('Locations');

  const [locations, setLocations] = useState<Location[]>([]);
  const [searchName, setSearchName] = useState<string>('');

  const { isLoading, error, isFetching } = useQuery<Location[], Error>(['locations', store.generation], async () => {
    const locationsResponse = await axios.get<Location[]>(
      `${store.apiUrl}/generations/${store.generation}/locations`,
      getAuthorizationHeader(store.password)
    );
    setLocations(locationsResponse.data);
    return locationsResponse.data;
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
    <>
      <GenerationSelect onChange={() => setSearchName('')} />
      <Center m={'1vh'}>
        <Input type={'text'} placeholder={'search name'} onChange={(event) => setSearchName(event.currentTarget.value)} />
      </Center>

      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric textAlign={'center'}>
              Encounters
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {locations.map((loc) => {
            const humanName = locationToHuman(loc.name);
            let show = true;
            if (searchName) {
              show = humanName.toLowerCase().includes(searchName.toLowerCase());
            }
            return show ? (
              <Tr key={`tr-loc-${loc.name}`}>
                <Td>
                  <Link href={`/locations/${loc.name}`}>{humanName}</Link>
                </Td>
                <Td textAlign={'center'}>{loc.encounters_number}</Td>
              </Tr>
            ) : null;
          })}
        </Tbody>
      </Table>
    </>
  );
};
