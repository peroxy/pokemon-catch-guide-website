import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Link, VStack } from '@chakra-ui/react';

export const PageNotFound = () => {
  return (
    <Center minHeight={'100vh'}>
      <VStack>
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            404
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Page not found or does not exist.
            <Box minHeight={'2vh'} />
            <Link href={'/'}>
              <Button>Go Back Home</Button>
            </Link>
          </AlertDescription>
        </Alert>
      </VStack>
    </Center>
  );
};
