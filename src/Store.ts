import create from 'zustand';
import ls, { get, set } from 'local-storage';

export type Store = {
  password: string;
  setPassword: (pass: string) => void;
  removePassword: () => void;
};

const password = get<string>('pokemon-catch-guide-password');
export const useStore = create<Store>((setState) => ({
  password: password,
  setPassword: (pass: string) => {
    set<string>('pokemon-catch-guide-password', pass);
    setState({ password: pass });
  },
  removePassword: () => {
    set<string>('pokemon-catch-guide-password', '');
    setState({ password: '' });
  }
}));
