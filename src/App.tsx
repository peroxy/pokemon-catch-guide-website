import React from 'react';
import { Login } from './components/Login';
import { Route, Redirect } from 'wouter';
import { useStore } from './Store';
import { PokemonList } from './components/PokemonList';
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  const store = useStore();
  return (
    <ChakraProvider>
      <Route path={'/'}>{store.password ? <Redirect to={'/pokemon'} /> : <Redirect to={'/login'} />}</Route>
      <Route path={'/login'} component={Login} />
      <Route path={'/pokemon'} component={PokemonList} />
    </ChakraProvider>
  );
}
