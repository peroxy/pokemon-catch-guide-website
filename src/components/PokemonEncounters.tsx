import { Avatar, AvatarGroup, Wrap, WrapItem } from '@chakra-ui/react';
import { Encounter, Pokemon } from '../api/api';
import { groupBy } from '../util/arrayUtils';

export interface PokemonEncountersProps {
  encounters: Encounter[];
  pokemonList: Pokemon[];
}

export const PokemonEncounters = (props: PokemonEncountersProps) => {
  const isPokemonCaught = (pokemonId: number) => {
    return props.pokemonList.find((value) => value.id === pokemonId)?.caught ?? false;
  };

  return (
    <AvatarGroup ml={'1em'} mr={'1em'} mt={'1em'}>
      <Wrap justify={'center'}>
        {groupBy(props.encounters, (item) => item.dex_id!!).map((encounter, i) => {
          return (
            <WrapItem key={`group_pkmn_${i}`}>
              <Avatar
                background={isPokemonCaught(encounter[0].pokemon_id) ? 'green.300' : 'gray.300'}
                name={encounter[0].pokemon_name!!}
                size={'md'}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${encounter[0].dex_id}.png`}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </AvatarGroup>
  );
};
