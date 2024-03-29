import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { BierDetailComponent } from '../../components/bier-detail/bier-detail/bier-detail.component';
import { FavouritesService } from '../../services/favourites.service';
import { MatCardModule } from '@angular/material/card';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritesComponent, BierDetailComponent],
      providers: [FavouritesService],
      imports: [MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favourites using a favourites$ Observable', (done) => {
    component.favourites$.subscribe((favourites) => {
      expect(favourites.length).toBe(0);
      done();
    });
  });
});
