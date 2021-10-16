import { useState } from 'react';
import { useStore } from '../Store';
import { useLocation } from 'wouter';
import { PokemonApi } from '../api/api';
import { Alert, AlertDescription, AlertIcon, Box, Button, Center, Input, InputGroup, Stack, Text } from '@chakra-ui/react';

export const Login = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const store = useStore();
  const [, setLocation] = useLocation();
  const [error, setError] = useState(false);

  const login = async () => {
    const api = new PokemonApi(password);
    await api.login(
      () => {
        setError(false);
        store.setPassword(password);
        setLocation('/pokemon');
      },
      (error) => {
        store.removePassword();
        setError(true);
      }
    );
  };

  return (
    <Center marginTop={'40vh'}>
      <Box width={['95%', '70%', '50%', '25%']}>
        <Stack spacing={5}>
          <Text textAlign={'center'} fontSize={'xl'}>
            Welcome to Pokemon Catching Guide!
          </Text>
          <InputGroup>
            <Input
              placeholder={'Enter password'}
              variant="outline"
              type={'password'}
              minLength={1}
              onChange={(value) => setPassword(value.currentTarget.value)}
            />
          </InputGroup>
          <Button onClick={login}>LOGIN</Button>
          <Alert status="error" boxShadow={'lg'} visibility={error ? 'visible' : 'hidden'}>
            <AlertIcon />
            <AlertDescription>Could not login. Please try again.</AlertDescription>
          </Alert>
        </Stack>
      </Box>
    </Center>
  );
};
