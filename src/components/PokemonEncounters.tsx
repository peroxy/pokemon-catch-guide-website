import {
  Avatar,
  AvatarGroup,
  Popover,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { Encounter, Pokemon } from '../api/api';
import { groupBy } from '../util/arrayUtils';
import { PokemonDetails } from './PokemonDetails';

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
          const firstEncounter = encounter[0];
          return (
            <WrapItem key={`group_pkmn_${i}`}>
              <Popover isLazy>
                <PopoverTrigger>
                  <Avatar
                    background={isPokemonCaught(firstEncounter.pokemon_id) ? 'green.300' : 'gray.300'}
                    name={firstEncounter.pokemon_name!!}
                    size={'md'}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${encounter[0].dex_id}.png`}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <PokemonDetails pokemonId={firstEncounter.pokemon_id} hideEncounters />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </WrapItem>
          );
        })}
      </Wrap>
    </AvatarGroup>
  );
};
