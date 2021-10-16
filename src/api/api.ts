import axios from 'axios';

export class PokemonApi {
  constructor(password: string) {
    this.password = password;
  }

  readonly password: string;
  readonly apiUrl: string = process.env.API_URL || 'http://localhost:8080';

  private readonly loginRoute = `${this.apiUrl}/login`;
  private readonly onError = (error: any) => {
    console.error(error);
  };
  private readonly getHeaders = () => {
    return { headers: { Authorization: `Bearer ${this.password}` } };
  };

  login = (onSuccess: () => void, onError: () => void) => {
    return axios.post(this.loginRoute, null, this.getHeaders()).then(onSuccess).catch(onError);
  };
}
