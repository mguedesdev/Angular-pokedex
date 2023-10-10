import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamComponent } from './pages/team/team.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { WhoPokemonComponent } from './pages/who-pokemon/who-pokemon.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'whoPokemon', component: WhoPokemonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
