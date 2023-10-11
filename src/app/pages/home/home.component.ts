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
  isLoading: boolean = true;
  placeholders: number[] = Array(20).fill(0);
  displayedPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe(response => {
      const pokemonDetailsObservables = response.results.map(pokemon => this.pokemonService.getPokemonDetails(pokemon.name));

      forkJoin(pokemonDetailsObservables).subscribe((pokemonDetails: PokemonDetail[]) => {
        this.pokemons = pokemonDetails.filter(pokemon => pokemon.id <= 1010);
        this.filteredPokemons = [...this.pokemons];
        this.loadDisplayedPokemons();
        this.isLoading = false;
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

  getTotalPages(): number {
    return Math.ceil(this.filteredPokemons.length / this.pokemonsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this.loadDisplayedPokemons();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = this.getTotalPages();
    }
    this.loadDisplayedPokemons();
  }

  goToPage(): void {
    if (this.currentPage <= 0) {
      this.currentPage = 1;
    }
  }

  loadDisplayedPokemons(): void {
    const start = (this.currentPage - 1) * this.pokemonsPerPage;
    const end = start + this.pokemonsPerPage;
    this.displayedPokemons = this.filteredPokemons.slice(start, end);
  }

  filterPokemons(searchTerm: string): void {
    if (!searchTerm) {
        this.filteredPokemons = [...this.pokemons];
    } else if (!isNaN(Number(searchTerm))) {
        const id = Number(searchTerm);
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.id === id);
    } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    this.currentPage = 1;
    this.loadDisplayedPokemons();
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
