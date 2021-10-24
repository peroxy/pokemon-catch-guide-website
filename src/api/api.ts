import axios from 'axios';

export class PokemonApi {
  constructor(password: string) {
    this.password = password;
  }

  readonly password: string;
  readonly apiUrl: string = process.env.API_URL || 'http://localhost:8080';

  private readonly getHeaders = () => {
    return { headers: { Authorization: `Bearer ${this.password}` } };
  };

  login = (onSuccess: () => void, onError: (error: any) => void) => {
    return axios.post(`${this.apiUrl}/login`, null, this.getHeaders()).then(onSuccess).catch(onError);
  };
}

export const getAuthorizationHeader = (password: string) => {
  return { headers: { Authorization: `Bearer ${password}` } };
};

export interface Pokemon {
  id: number;
  dex_id: number;
  name: string;
  generation: number;
  caught: boolean;
}

export interface Encounter {
  id: number;
  location: string;
  pokemon_id: number;
  dex_id: number | null;
  pokemon_name: string | null;
  version: string | null;
  conditions: string | null;
  obtain_method: string | null;
  chance: number | null;
  min_level: number | null;
  max_level: number | null;
  evolution_trigger: string;
  evolution_method: string;
  is_baby: boolean;
}
