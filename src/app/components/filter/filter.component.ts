import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { PokemonTypesResponse } from 'src/app/interfaces/pokemon-types-response.interface';
import { Output, EventEmitter } from '@angular/core';
import { FilterData } from 'src/app/interfaces/pokemon-filter.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  tipos: any[] = [];
  searchTerm: string = '';
  selectedType1: string = 'all';
  selectedType2: string = 'all';


  constructor(private pokemonService: PokemonService) {}

  @Output() searchTermChanged = new EventEmitter<FilterData>();


  onSearchTermChange(): void {
    this.searchTermChanged.emit({ searchTerm: this.searchTerm, selectedType1: this.selectedType1, selectedType2: this.selectedType2 });
  }



  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  ngOnInit(): void {
    this.pokemonService.getPokemonTypes().subscribe((response: PokemonTypesResponse) => {
      this.tipos = response.results;

    });
  }
}
