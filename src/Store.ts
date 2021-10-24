import create from 'zustand';
import { get, set } from 'local-storage';

export type Store = {
  password: string;
  setPassword: (pass: string) => void;
  removePassword: () => void;
  apiUrl: string;
  generation: number;
  setGeneration: (gen: number) => void;
  generationMaxDexNumber: number;
};

const getMaxGenerationDexNumber = (generation: number) => {
  switch (generation) {
    case 1:
      return 151;
    case 2:
      return 251;
    case 3:
      return 386;
    case 4:
      return 493;
    case 5:
      return 649;
    case 6:
      return 721;
    case 7:
      return 809;
    case 8:
      return 898;
    default:
      throw 'not supported';
  }
};

const password = get<string>('pokemon-catch-guide-password');
const generation = get<number>('pokemon-catch-guide-generation');
export const useStore = create<Store>((setState) => ({
  password: password,
  setPassword: (pass: string) => {
    set<string>('pokemon-catch-guide-password', pass);
    setState({ password: pass });
  },
  removePassword: () => {
    set<string>('pokemon-catch-guide-password', '');
    setState({ password: '' });
  },
  apiUrl: process.env.API_URL || 'http://localhost:8080',
  generation: generation || 1,
  setGeneration: (gen: number) => {
    set<number>('pokemon-catch-guide-generation', gen);
    setState({ generation: gen, generationMaxDexNumber: getMaxGenerationDexNumber(gen) });
  },
  generationMaxDexNumber: getMaxGenerationDexNumber(generation || 1)
}));
