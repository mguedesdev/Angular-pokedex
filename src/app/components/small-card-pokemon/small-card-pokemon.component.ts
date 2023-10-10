import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-card-pokemon',
  templateUrl: './small-card-pokemon.component.html',
  styleUrls: ['./small-card-pokemon.component.css']
})
export class SmallCardPokemonComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() id: number = 0;
  @Input() types: string[] = [];

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
