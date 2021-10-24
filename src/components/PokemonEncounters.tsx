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
import { useState } from 'react';

export interface PokemonEncountersProps {
  encounters: Encounter[];
  pokemonList: Pokemon[];
}

export const PokemonEncounters = (props: PokemonEncountersProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(props.pokemonList);

  const isPokemonCaught = (pokemonId: number) => {
    return pokemonList.find((value) => value.id === pokemonId)?.caught ?? false;
  };

  const onCaughtChanged = (caught: boolean, firstEncounter: Encounter) => {
    let prevPokemonList = [...pokemonList];
    for (const updated of pokemonList.filter((value) => value.dex_id === firstEncounter.dex_id)) {
      const found = prevPokemonList.find((value) => value.id === updated.id);
      if (found) {
        found.caught = caught;
      }
    }
    setPokemonList(prevPokemonList);
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
                    src={`/sprites/icons/${encounter[0].dex_id}.png`}
                    cursor={'pointer'}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <PokemonDetails
                      pokemonId={firstEncounter.pokemon_id}
                      hideEncounters
                      onCaughtChanged={(caught) => onCaughtChanged(caught, firstEncounter)}
                    />
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
