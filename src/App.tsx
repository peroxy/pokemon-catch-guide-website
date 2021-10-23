import React from 'react';
import { Login } from './components/Login';
import { Route, Redirect, Switch } from 'wouter';
import { useStore } from './Store';
import { PokemonList } from './components/PokemonList';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PokemonDetails } from './components/PokemonDetails';
import { PageNotFound } from './components/PageNotFound';
import { Location } from './components/Location';

export default function App() {
  const store = useStore();
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path={'/'}>{store.password ? <Redirect to={'/pokemon'} /> : <Redirect to={'/login'} />}</Route>
          <Route path={'/login'} component={Login} />
          <Route path={'/pokemon'} component={PokemonList} />
          <Route path={'/pokemon/details/:id'}>
            {(params) => {
              const id = parseInt(params.id);
              if (params && !isNaN(id)) {
                return <PokemonDetails pokemonId={parseInt(params.id)} />;
              } else {
                return <PageNotFound />;
              }
            }}
          </Route>
          <Route path={'/locations/:name'}>{(params) => <Location name={params.name} />}</Route>
          <Route component={PageNotFound} />
        </Switch>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
