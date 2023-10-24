import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonTypesResponse } from '../interfaces/pokemon-types-response.interface';
import { PokemonListResponse } from '../interfaces/pokemon-list-response.interface';
import { PokemonDetail } from '../interfaces/pokemon-detail.interface';
import { PokemonGenerationResponse } from '../interfaces/pokemon-generation-response.interface';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonDetails(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonTypes(): Observable<PokemonTypesResponse> {
    return this.http.get<PokemonTypesResponse>(`${this.baseUrl}/type`);
  }

  getAllPokemons(limit: number = 1010): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}`);
  }

  getGenerationPokemons(generation: number): Observable<PokemonGenerationResponse> {
    return this.http.get<PokemonGenerationResponse>(`${this.baseUrl}/generation/${generation}`);
  }

  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${id}`);
  }

  getEvolutionChain(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
