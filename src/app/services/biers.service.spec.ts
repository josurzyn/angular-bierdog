import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BiersService } from './biers.service';
import { Bier } from '../bier.interface';
import { FavouritesService } from './favourites.service';

describe('BiersService', () => {
  let service: BiersService;
  let httpMock: HttpTestingController;
  let favouritesService: FavouritesService;
  const biers = [
    {
      id: 0,
      name: 'first bier',
      tagline: '',
      description: '',
      image_url: '',
      abv: 5,
      food_pairing: [],
      favourite: false,
      mash: 7,
      yeast: ['yeast'],
    },
    {
      id: 1,
      name: 'second bier',
      image_url: '',
      abv: 7,
    },
    {
      id: 2,
      name: 'third bier',
      image_url: '',
      abv: 4,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavouritesService],
    });
    service = TestBed.inject(BiersService);
    httpMock = TestBed.inject(HttpTestingController);
    favouritesService = TestBed.inject(FavouritesService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Bier[]> to browse', (done) => {
    service.getBiers().subscribe((apiBiers) => {
      expect(apiBiers.length).toBe(3);
      expect(apiBiers[0].name).toBe('first bier');
      done();
    });

    const req = httpMock.expectOne(
      'https://api.punkapi.com/v2/beers?per_page=50'
    );
    expect(req.request.method).toBe('GET');
    req.flush(biers);
  });

  it('should return a random Observable<Bier>', (done) => {
    const randomBier: Bier[] = [
      {
        id: 0,
        name: 'random bier',
        image_url: '',
        abv: 5,
      },
    ];

    service.getRandomBier().subscribe((biers) => {
      expect(biers[0]?.name).toBe('random bier');
      done();
    });

    const req = httpMock.expectOne('https://api.punkapi.com/v2/beers/random');
    expect(req.request.method).toBe('GET');
    req.flush(randomBier);
  });

  it('should search using provided parameters', (done) => {
    const testParams = 'abv_lt=56&abv_gt=0&food=chips&beer_name=pils';
    service.getByFilters(testParams).subscribe((apiBiers) => {
      expect(apiBiers.length).toBe(3);
      done();
    });

    const req = httpMock.expectOne(
      'https://api.punkapi.com/v2/beers?abv_lt=56&abv_gt=0&food=chips&beer_name=pils&per_page=50'
    );
    req.flush(biers);
  });

  it('should convert api results to Bier interface', () => {
    const formattedBiers = service.formatBierResult(biers);
    expect(formattedBiers.length).toBe(3);
    expect(Object.keys(formattedBiers[0]).length).toBe(8);
    expect(Object.keys(formattedBiers[1]).length).toBe(8);
  });

  it('should check if bier is in favourites', (done) => {
    const secondBier = {
      id: 1,
      name: 'second bier',
      image_url: '',
      abv: 7,
      favourite: true,
    };
    favouritesService.addBierToFavourites(secondBier);
    favouritesService.favourites$.subscribe(() => {
      const formattedBiers = service.formatBierResult(biers);
      expect(formattedBiers[0].favourite).toBeFalsy();
      expect(formattedBiers[1].favourite).toBeTruthy();
      done();
    });
  });
});
