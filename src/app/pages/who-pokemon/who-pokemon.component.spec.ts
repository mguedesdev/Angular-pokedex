import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoPokemonComponent } from './who-pokemon.component';

describe('WhoPokemonComponent', () => {
  let component: WhoPokemonComponent;
  let fixture: ComponentFixture<WhoPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhoPokemonComponent]
    });
    fixture = TestBed.createComponent(WhoPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
