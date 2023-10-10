import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCardPokemonComponent } from './small-card-pokemon.component';

describe('SmallCardPokemonComponent', () => {
  let component: SmallCardPokemonComponent;
  let fixture: ComponentFixture<SmallCardPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallCardPokemonComponent]
    });
    fixture = TestBed.createComponent(SmallCardPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
