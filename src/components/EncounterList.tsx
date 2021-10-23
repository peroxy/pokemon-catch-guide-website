import { Divider, HStack, Link, List, ListItem, Tag, Text, Wrap } from '@chakra-ui/react';
import { sort } from 'fast-sort';
import { Encounter } from '../api/api';

export interface EncounterListProps {
  encounters: Encounter[];
  showLocation: boolean;
  showPokemonName: boolean;
}
export const EncounterList = (props: EncounterListProps) => {
  return (
    <List>
      {sort(props.encounters)
        .desc((prop) => prop.chance)
        .map((encounter, i) => {
          return (
            <ListItem key={`pkmn-enc-${i}`}>
              <Divider width={'85vw'} marginTop={'1rem'} marginBottom={'1rem'} />
              <Wrap marginLeft={'1rem'}>
                {props.showPokemonName && encounter.pokemon_name && (
                  <HStack>
                    <Tag>Name</Tag>
                    <Link href={`/pokemon/details/${encounter.pokemon_id}`}>
                      <Text>{encounter.pokemon_name}</Text>
                    </Link>
                  </HStack>
                )}
                {props.showLocation && encounter.location && (
                  <HStack>
                    <Tag>Location</Tag>
                    <Link href={`/locations/${encounter.location}`}>
                      <Text>{encounter.location}</Text>
                    </Link>
                  </HStack>
                )}
                {encounter.version && (
                  <HStack>
                    <Tag>Version</Tag>
                    <Text>{encounter.version}</Text>
                  </HStack>
                )}
                {encounter.chance && (
                  <HStack>
                    <Tag>Chance</Tag>
                    <Text>{encounter.chance}%</Text>
                  </HStack>
                )}
                {encounter.conditions && (
                  <HStack>
                    <Tag>Condition</Tag>
                    <Text>{encounter.conditions}</Text>
                  </HStack>
                )}
                {encounter.obtain_method && (
                  <HStack>
                    <Tag>Method</Tag>
                    <Text textTransform={'capitalize'}>{encounter.obtain_method}</Text>
                  </HStack>
                )}
                {encounter.min_level && encounter.max_level && (
                  <HStack>
                    <Tag>Level</Tag>
                    <Text>
                      {encounter.min_level === encounter.max_level
                        ? `${encounter.min_level}`
                        : `${encounter.min_level}-${encounter.max_level}`}
                    </Text>
                  </HStack>
                )}
              </Wrap>
            </ListItem>
          );
        })}
    </List>
  );
};
