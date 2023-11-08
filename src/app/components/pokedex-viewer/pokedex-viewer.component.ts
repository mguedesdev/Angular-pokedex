import { Component, ElementRef, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonAbility } from 'src/app/interfaces/pokemon-ability.interface';
import { PokemonDetail } from 'src/app/interfaces/pokemon-detail.interface';
import { PokemonStats } from 'src/app/interfaces/pokemon-stats.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex-viewer',
  templateUrl: './pokedex-viewer.component.html',
  styleUrls: ['./pokedex-viewer.component.css']
})
export class PokedexViewerComponent {
  @Input() pokemons: any[] = [];
  @Input() name: string | null = '';
  @Input() types: string[]  = [];
  @Input() description: string = '';
  @Input() abilities: PokemonAbility[] = [];
  @Input() height: number | null = 0;
  @Input() weight: number | null = 0;
  @Input() stats: PokemonStats[] = [];
  @Input() baseExperience: number | null = 0;
  @Input() captureRate: number | null = 0;
  @Input() evolutionChain: { name: string, id: number }[] = [];
  newStats: { label: string, value: number }[] = [];
  pokemonEvolutionSilhueta: string[] = [
    'assets/charmander-silhueta.png',
    'assets/charmeleon-silhueta.png',
    'assets/charizard-silhueta.png'
  ]
  pokemon: PokemonDetail | null = null;
  previousAndNextPokemon: {name:string, id:number, url:string}[] = [];

  @ViewChild('imageElement') imageElement!: ElementRef;

  @Output() closeViewer = new EventEmitter<void>();

  private _imageUrl: string | null = '';
  @Input()
  set imageUrl(value: string | null) {
    this._imageUrl = value;
    this.changeImage();
  }
  get imageUrl(): string | null {
    return this._imageUrl;
  }

  private _id: number | null = 0;
  @Input() set id(value: number | null) {
    this._id = value;
    if (value) {
      this.fetchPokemonSpecie();
    }
  }
  get id(): number | null {
    return this._id;
  }

  constructor(private pokemonService: PokemonService) { }

  fetchPokemonSpecie(): void {
      if (this.id) {
        this.pokemonService.getPokemonSpecies(this.id).subscribe(response => {
          this.processPokemonSpeciesResponse(response);
        });
      }
  }

  fetchEvolutionChain(url: string): void {
    this.pokemonService.getEvolutionChain(url).subscribe(response => {
      this.processEvolutionChainResponse(response);
    });
  }

  processEvolutionChainResponse(response: any): void {
    if (response?.chain?.species?.name) {
      this.evolutionChain.push({ name: response.chain.species.name, id: this.getIdFromUrl(response.chain.species.url) });
    }
    if (response?.chain?.evolves_to && response.chain.evolves_to.length > 0) {
      response.chain.evolves_to.forEach((evolution: any) => {
        if (evolution?.species?.name) {
          this.evolutionChain.push({ name: evolution.species.name, id: this.getIdFromUrl(evolution.species.url) });
        }
        if (evolution?.evolves_to && evolution.evolves_to.length > 0) {
          evolution.evolves_to.forEach((evolution2: any) => {
            if (evolution2?.species?.name) {
              this.evolutionChain.push({ name: evolution2.species.name, id: this.getIdFromUrl(evolution2.species.url) });
            }
          });
        }
      });
    }
  }

  getPokemonImageEvolution(id: number): string {
    const pokemonImage = this.pokemons.find(pokemon => pokemon.id === id)?.sprites.other['official-artwork'].front_default;
    return pokemonImage || '';
  }

  getIdFromUrl(url: string): number {
    const urlParts = url.split('/');
    return Number(urlParts[urlParts.length - 2]);
  }

  processPokemonSpeciesResponse(response: any): void {
    if (response.flavor_text_entries?.length > 0) {
      let rawDescription =  response.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text;
      this.description = rawDescription.replace(/\f/g, ' ');
    }else {
      this.description = 'No description available';
    }
    if(response.evolution_chain?.url) {
      this.fetchEvolutionChain(response.evolution_chain.url);
    }
    if(response.capture_rate) {
      this.captureRate = response.capture_rate;
    }

  }

  changeImage() {
    if (this.imageElement?.nativeElement) {
      this.imageElement?.nativeElement.classList.remove('image_placeHolder');
      this.imageElement.nativeElement.classList.add('scale-animation');
      setTimeout(() => {
        this.imageElement?.nativeElement.classList.remove('scale-animation');
      }, 200);
    }
  }

  getBackgroundColorForType(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: 'var(--normal)',
      fighting: 'var(--fighting)',
      flying: 'var(--flying)',
      poison: 'var(--poison)',
      ground: 'var(--ground)',
      rock: 'var(--rock)',
      bug: 'var(--bug)',
      ghost: 'var(--ghost)',
      steel: 'var(--steel)',
      fire: 'var(--fire)',
      water: 'var(--water)',
      grass: 'var(--grass)',
      electric: 'var(--electric)',
      psychic: 'var(--psychic)',
      ice: 'var(--ice)',
      dragon: 'var(--dragon)',
      dark: 'var(--dark)',
      fairy: 'var(--fairy)',
      unknown: 'var(--unknown)',
      shadow: 'var(--shadow)'
    };

    return typeColors[type] || 'var(--cinza-escuro)';
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  clearEvolutionChain(): void {
      this.evolutionChain = [];
  }

  updatePokemon(id: number): void {
    this.clearEvolutionChain();
    this.getPreviousAndNextPokemon(id);
    let pokemonUpdate = this.pokemons.find(pokemon => pokemon.id === id);
    if(pokemonUpdate) {
      this.pokemon = pokemonUpdate;
      this.name = pokemonUpdate.name;
      this.types = pokemonUpdate.types.map((typePokemon: { type: { name: string } }) => typePokemon.type.name);
      this.height = pokemonUpdate.height;
      this.weight = pokemonUpdate.weight;
      this.stats = pokemonUpdate.stats;
      this.baseExperience = pokemonUpdate.base_experience;
      this.imageUrl = pokemonUpdate.sprites.other['official-artwork'].front_default;
      this.id = pokemonUpdate.id;

      if (this.pokemon) {
        this.fetchEvolutionChain(this.pokemon.species.url);
      }

    }
  }

  getPreviousAndNextPokemon(id:number): void {
    if(id){
      if(id === 1 ) {
        this.previousAndNextPokemon = this.pokemons.filter(pokemon => pokemon.id === this.pokemons.length || pokemon.id === (id ?? 0) + 1).map(pokemon => {
          return { name: pokemon.name, id: pokemon.id, url: pokemon.sprites.other['official-artwork'].front_default };
        });
        this.previousAndNextPokemon.reverse();
      }
      else if ( id === 1010 ) {
        this.previousAndNextPokemon = this.pokemons.filter(pokemon => pokemon.id === (id ?? 0) - 1 || pokemon.id === 1).map(pokemon => {
          return { name: pokemon.name, id: pokemon.id, url: pokemon.sprites.other['official-artwork'].front_default };
        });
        this.previousAndNextPokemon.reverse();
      }
      else {
        this.previousAndNextPokemon = this.pokemons.filter(pokemon => pokemon.id === (id ?? 0) - 1 || pokemon.id === (id ?? 0) + 1).map(pokemon => {
          return { name: pokemon.name, id: pokemon.id, url: pokemon.sprites.other['official-artwork'].front_default };
        });
        this.previousAndNextPokemon.sort((a, b) => a.id - b.id);
      }
    }
  }

  previousPokemon(): void {
    if(this.id === 1) {
      this.updatePokemon(this.pokemons[this.pokemons.length - 1].id);
    }else {
      this.updatePokemon(this.id ? this.id - 1 : 1);
    }
  }

  nextPokemon(): void {
    if(this.id === 1010) {
      this.updatePokemon(this.pokemons[0].id);
    }else {
      this.updatePokemon(this.id ? this.id + 1 : 1);
    }
  }

  closeViewerClick(): void {
    this.closeViewer.emit();
  }

}
