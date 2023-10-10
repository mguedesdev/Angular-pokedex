import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pokemons: any[] = [];
  currentPage: number = 1;
  pokemonsPerPage: number = 20;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    const offset = (this.currentPage - 1) * this.pokemonsPerPage;
    this.pokemonService.getPokemons(offset).subscribe(response => {
      const pokemonDetailsObservables = response.results.map(pokemon => {
        const id = this.extractIdFromUrl(pokemon.url);
        return this.pokemonService.getPokemonDetails(id);
      });

      forkJoin(pokemonDetailsObservables).subscribe(pokemonDetails => {
        this.pokemons = pokemonDetails;
      });
    });
  }

  getPokemonTypes(pokemon: any): string[] {
    return pokemon.types.map((type: any) => type.type.name);
  }


  extractIdFromUrl(url: string): number {
    const segments = url.split('/');
    return +segments[segments.length - 2];
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPokemons();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

}
