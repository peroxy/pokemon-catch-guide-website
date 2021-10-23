export interface PokemonDetailsProps {
  pokemonId: number;
}
export const PokemonDetails = (props: PokemonDetailsProps) => {
  return <div>hello world to {props.pokemonId}</div>;
};
