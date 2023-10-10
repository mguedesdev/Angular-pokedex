import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SmallCardPokemonComponent } from './components/small-card-pokemon/small-card-pokemon.component';
import { PokedexViewerComponent } from './components/pokedex-viewer/pokedex-viewer.component';
import { TeamComponent } from './pages/team/team.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { WhoPokemonComponent } from './pages/who-pokemon/who-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SearchBarComponent,
    SmallCardPokemonComponent,
    PokedexViewerComponent,
    TeamComponent,
    PokemonComponent,
    WhoPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
