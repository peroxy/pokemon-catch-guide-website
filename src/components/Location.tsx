export interface LocationProps {
  name: string;
}
export const Location = (props: LocationProps) => {
  return <div>hola {props.name}</div>;
};
