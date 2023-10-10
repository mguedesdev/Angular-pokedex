import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SmallCardPokemonComponent } from './components/small-card-pokemon/small-card-pokemon.component';
import { PokedexViewerComponent } from './components/pokedex-viewer/pokedex-viewer.component';
import { TeamComponent } from './pages/team/team.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { WhoPokemonComponent } from './pages/who-pokemon/who-pokemon.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SmallCardPokemonComponent,
    PokedexViewerComponent,
    TeamComponent,
    PokemonComponent,
    WhoPokemonComponent,
    FooterComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
