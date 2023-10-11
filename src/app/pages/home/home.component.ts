import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokemonDetail } from 'src/app/interfaces/pokemon-detail.interface';
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
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe(response => {
      const pokemonDetailsObservables = response.results.map(pokemon => {
        const id = this.extractIdFromUrl(pokemon.url);
        return this.pokemonService.getPokemonDetails(id);
      });

      forkJoin(pokemonDetailsObservables).subscribe((pokemonDetails: PokemonDetail[]) => {
        this.pokemons = pokemonDetails.filter(pokemon => pokemon.id <= 1010);
        this.filteredPokemons = [...this.pokemons];
      });
    });
  }

  getDisplayedPokemons(): any[] {
    const start = (this.currentPage - 1) * this.pokemonsPerPage;
    const end = start + this.pokemonsPerPage;
    return this.filteredPokemons.slice(start, end);
  }


  getPokemonTypes(pokemon: any): string[] {
    return pokemon.types.map((type: any) => type.type.name);
  }


  extractIdFromUrl(url: string): number {
    const segments = url.split('/');
    return +segments[segments.length - 2];
  }

  nextPage(): void {
    if (this.currentPage * this.pokemonsPerPage < 1010) {
        this.currentPage++;
    } else {
        this.currentPage = 1;
    }
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = 51;
    }
  }


  goToPage(): void {
    if (this.currentPage <= 0) {
      this.currentPage = 1;
    }
  }


  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  filterPokemons(searchTerm: string): void {
    if (searchTerm) {
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      this.filteredPokemons = [...this.pokemons];
    }
  }


}
