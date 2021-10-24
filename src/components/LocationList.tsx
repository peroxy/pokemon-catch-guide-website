import { useStore } from '../Store';
import { useQuery } from 'react-query';
import { getAuthorizationHeader, Location } from '../api/api';
import axios from 'axios';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Link, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { useTitle } from '../util/hooks';

export const LocationList = () => {
  const store = useStore();
  useTitle('Locations');

  const [locations, setLocations] = useState<Location[]>([]);

  const { isLoading, error, isFetching } = useQuery<Location[], Error>('locations', async () => {
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
        {locations.map((loc) => (
          <Tr key={`tr-loc-${loc.name}`}>
            <Td textTransform={'capitalize'}>
              <Link href={`/locations/${loc.name}`}>{loc.name.replaceAll('-', ' ')}</Link>
            </Td>
            <Td textAlign={'center'}>{loc.encounters_number}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
