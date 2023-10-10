import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexViewerComponent } from './pokedex-viewer.component';

describe('PokedexViewerComponent', () => {
  let component: PokedexViewerComponent;
  let fixture: ComponentFixture<PokedexViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokedexViewerComponent]
    });
    fixture = TestBed.createComponent(PokedexViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
