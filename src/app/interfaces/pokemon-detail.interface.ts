import { PokemonAbility } from './pokemon-ability.interface';
import { PokemonStats } from './pokemon-stats.interface';

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
    }
  }>;
  abilities: PokemonAbility[];
  stats: PokemonStats[];
  species: {
    name: string;
    url: string;
  };
  weight: number;
  height: number;
  base_experience: number;
}
