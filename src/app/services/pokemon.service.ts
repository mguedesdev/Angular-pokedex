import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonTypesResponse } from '../interfaces/pokemon-types-response.interface';
import { PokemonListResponse } from '../interfaces/pokemon-list-response.interface';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(offset = 0): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=20`);
  }

  getPokemonDetails(id: number) {
    return this.http.get(`${this.baseUrl}/pokemon/${id}`);
  }

  getPokemonTypes(): Observable<PokemonTypesResponse> {
    return this.http.get<PokemonTypesResponse>(`${this.baseUrl}/type`);
  }


}
