import { Divider, HStack, List, ListItem, Tag, Text, Wrap } from '@chakra-ui/react';
import { sort } from 'fast-sort';
import { Encounter } from '../api/api';

export interface EncounterListProps {
  encounters: Encounter[];
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
                {encounter.location && (
                  <HStack>
                    <Tag>Location</Tag>
                    <Text>{encounter.location}</Text>
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
