import { useStore } from '../Store';
import { Center, Select } from '@chakra-ui/react';

export interface GenerationSelectProps {
  onChange?: () => void;
}
export const GenerationSelect = (props: GenerationSelectProps) => {
  const store = useStore();

  const onChangeGeneration = (event: React.ChangeEvent<HTMLSelectElement>) => {
    store.setGeneration(parseInt(event.currentTarget.value));
    props.onChange?.();
  };

  return (
    <Center margin={'1vh'}>
      <Select width={'md'} defaultValue={store.generation} onChange={onChangeGeneration}>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <option key={`gen-option${value}`} value={value}>
            Generation {value}
          </option>
        ))}
      </Select>
    </Center>
  );
};
