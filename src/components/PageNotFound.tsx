import { Text, Box, Center, Heading, VStack, Image, usePrefersReducedMotion } from '@chakra-ui/react';
import { useTitle } from '../util/hooks';

export const PageNotFound = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  useTitle('404 - Not Found');

  return (
    <Center mt={'5rem'}>
      <VStack>
        <Heading fontSize={'9xl'} textShadow={'2px 2px 8px #4AB7FF'}>
          404
        </Heading>
        <Box>
          <Text align={'center'} m={'1rem'}>
            Page nowt found ow does nowt exist, did uwu weawwy mean tuwu duwu thiws? Sowwy senpai ^_^
          </Text>
        </Box>
        <Image
          src={'/404.jpg'}
          alt={'deep fried pikachu with laughing with open eye crying laughing emoji '}
          className={prefersReducedMotion ? undefined : 'rotating'}
        />
      </VStack>
    </Center>
  );
};
