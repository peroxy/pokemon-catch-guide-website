import { toTitleCase } from './stringUtils';

export const locationToHuman = (location: string) => {
  return toTitleCase(location.replaceAll('-', ' '));
};
