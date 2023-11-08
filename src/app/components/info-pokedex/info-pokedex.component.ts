import { Component, Input } from '@angular/core';
import { PokemonAbility } from 'src/app/interfaces/pokemon-ability.interface';
import { PokemonStats } from 'src/app/interfaces/pokemon-stats.interface';

@Component({
  selector: 'app-info-pokedex',
  templateUrl: './info-pokedex.component.html',
  styleUrls: ['./info-pokedex.component.css']
})
export class InfoPokedexComponent {
  @Input() description: string = '';
  @Input() abilities: PokemonAbility[] = [];
  @Input() height: number | null = 0;
  @Input() weight: number | null = 0;
  @Input() stats: PokemonStats[] = [];
  @Input() baseExperience: number | null = 0;
  @Input() captureRate: number | null = 0;
  newStats: { label: string, value: number }[] = [];

  statusPokemon() {
    const statsLabels = ['HP', 'ATK', 'DEF', 'SpA', 'SpD', 'SPD'];
    this.newStats = this.stats.map((stat, index) => ({ label: statsLabels[index], value: stat.base_stat }));
    const total = this.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
    this.newStats.push({ label: 'TOT', value: total });
  }
}
