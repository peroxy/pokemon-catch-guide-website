import axios, { AxiosResponse } from 'axios';

export class PokemonApi {
  constructor(password: string) {
    this.password = password;
  }

  readonly password: string;
  readonly apiUrl: string = process.env.API_URL || 'http://localhost:8080';

  private readonly getPokemonRoute = `${this.apiUrl}/pokemon/:id`;
  private readonly getEncountersRoute = `${this.apiUrl}/pokemon/:pokemon_id/encounters`;
  private readonly getLocationEncountersRoute = `${this.apiUrl}/locations/:location/generations/:generation/encounters`;
  private readonly postPokemonCaught = `${this.apiUrl}/pokemon/:pokemon_id/caught/:caught`;

  private readonly onError = (error: any) => {
    console.error(error);
  };
  private readonly getHeaders = () => {
    return { headers: { Authorization: `Bearer ${this.password}` } };
  };

  login = (onSuccess: () => void, onError: (error: any) => void) => {
    return axios.post(`${this.apiUrl}/login`, null, this.getHeaders()).then(onSuccess).catch(onError);
  };

  getAllPokemon = (generation: number, onSuccess: (response: AxiosResponse) => void, onError: (error: any) => void) => {
    return axios.get(`${this.apiUrl}/pokemon/generations/${generation}`, this.getHeaders()).then(onSuccess).catch(onError);
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
