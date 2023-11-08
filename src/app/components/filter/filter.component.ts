import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { PokemonTypesResponse } from 'src/app/interfaces/pokemon-types-response.interface';
import { Output, EventEmitter } from '@angular/core';
import { FilterData } from 'src/app/interfaces/pokemon-filter.interface';

type DropdownNames = 'order' | 'type1' | 'type2' | 'generation';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  tipos: any[] = [];
  searchTerm: string = '';
  selectedType1: string = '';
  selectedType2: string = '';
  generation: string = '';
  hoveredTypes: { [key: string]: boolean } = {};


  constructor(private pokemonService: PokemonService) {}

  @Output() searchTermChanged = new EventEmitter<FilterData>();
  order: string = '';
  selectedLabel: string | null = null;
  selectedImage: string | null = null;
  selectedType1Label: string | null = null;
  selectedType2Label: string | null = null;
  selectedGenerationLabel: string | null = null;

  dropdowns: Record<DropdownNames, boolean> = {
    order: false,
    type1: false,
    type2: false,
    generation: false
  };

  setHover(type: string): void {
    this.hoveredTypes[type] = true;
  }

  clearHover(type: string): void {
      this.hoveredTypes[type] = false;
  }

  toggleDropdown(dropdownName: DropdownNames): void {
    if (this.dropdowns[dropdownName]) {
      this.dropdowns[dropdownName] = false;
  } else {
      Object.keys(this.dropdowns).forEach(key => {
          this.dropdowns[key as DropdownNames] = false;
      });
      this.dropdowns[dropdownName] = true;
  }
  }

  selectOption(dropdownName: DropdownNames, value: string | number): void {
    switch (dropdownName) {
      case 'order':
        this.order = value.toString();
        this.selectedLabel = value === 'asc' ? 'Ascending' : 'Descending';
        break;
      case 'type1':
        this.selectedType1 = value.toString();
        this.selectedType1Label = value === 'all' ? 'All' : this.capitalizeFirstLetter(this.selectedType1);
        break;
      case 'type2':
        this.selectedType2 = value.toString();
        this.selectedType2Label = value === 'all' ? 'All' : this.capitalizeFirstLetter(this.selectedType2);
        break;
      case 'generation':
        this.generation = value.toString();
        this.selectedGenerationLabel = value === 'all' ? 'All' : `${value}th Generation`;
        break;
    }
    this.dropdowns[dropdownName] = false;
    this.onSearchTermChange();
  }

  closeFilterMenu(): void {

  }


  onSearchTermChange(): void {
    this.searchTermChanged.emit({
        searchTerm: this.searchTerm,
        selectedType1: this.selectedType1,
        selectedType2: this.selectedType2,
        generation: this.generation,
        order: this.order
    });
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonTypes().subscribe((response: PokemonTypesResponse) => {
      this.tipos = response.results;
      this.tipos.splice(-2);
    });
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
}
