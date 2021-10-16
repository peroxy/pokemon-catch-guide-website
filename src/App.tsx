import React from 'react';
import { Login } from './components/Login';
import { Route, Redirect } from 'wouter';
import { useStore } from './Store';
import { PokemonList } from './components/PokemonList';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  const store = useStore();
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Route path={'/'}>{store.password ? <Redirect to={'/pokemon'} /> : <Redirect to={'/login'} />}</Route>
        <Route path={'/login'} component={Login} />
        <Route path={'/pokemon'} component={PokemonList} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
