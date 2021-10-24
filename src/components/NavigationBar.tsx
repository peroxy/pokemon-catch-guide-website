import { Box, HStack, Link, Text } from '@chakra-ui/react';

export const NavigationBar = () => {
  return (
    <Box minWidth={'100vw'} boxShadow={'md'} mb={5}>
      <HStack align={'center'} minHeight={'5vh'} spacing={5} ml={5}>
        <Link href={'/'}>
          <Text>Home</Text>
        </Link>
        <Link href={'/pokemon'}>
          <Text>Pokemon</Text>
        </Link>
        <Link href={'/locations'}>
          <Text>Locations</Text>
        </Link>
      </HStack>
    </Box>
  );
};
