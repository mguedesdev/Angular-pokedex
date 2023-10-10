import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { PokemonTypesResponse } from 'src/app/interfaces/pokemon-types-response.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  tipos: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  ngOnInit(): void {
    this.pokemonService.getPokemonTypes().subscribe((response: PokemonTypesResponse) => {
      this.tipos = response.results;

    });
  }
}
