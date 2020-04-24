import { TestBed } from '@angular/core/testing';

import { FavouritesService } from './favourites.service';
import { Bier } from './bier.interface';

describe('FavouritesService', () => {
  let service: FavouritesService;
  const bier: Bier = {
    id: 1,
    name: '',
    image_url: '',
    abv: 0,
    favourite: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add bier to favourites', (done) => {
    service.addBierToFavourites(bier);

    service.favourites$.subscribe((biers) => {
      expect(biers.length).toBe(1);
      done();
    });
  });

  it('should check if bier is a favourite', () => {
    const isFav = service.isFavourite(bier);
    expect(isFav).toBeTruthy();
  });

  it('should get favourites$ Observable', (done) => {
    const favourites$ = service.favourites$;
    favourites$.subscribe((biers) => {
      expect(biers).toEqual([
        {
          id: 1,
          name: '',
          image_url: '',
          abv: 0,
          favourite: true,
        },
      ]);
      done();
    });
  });

  it('should get favouritesCount$ Observable', (done) => {
    const favouritesCount$ = service.favouritesCount$;
    favouritesCount$.subscribe((count) => {
      expect(count).toBe(1);
      done();
    });
  });

  it('should remove bier from favourites', (done) => {
    service.removeBierFromFavourites(bier);

    service.favourites$.subscribe((biers) => {
      expect(biers.length).toBe(0);
      done();
    });
  });
});
