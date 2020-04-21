import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bier } from './bier.interface';
import { map } from 'rxjs/operators';

import { FavouritesService } from './favourites.service';

@Injectable({
  providedIn: 'root',
})
export class BiersService {
  constructor(
    private http: HttpClient,
    private favouritesService: FavouritesService
  ) {}

  baseUrl = 'https://api.punkapi.com/v2/beers';

  getBiers() {
    return this.http
      .get<Bier[]>(`${this.baseUrl}?per_page=50`)
      .pipe(map(this.formatBierResult));
  }

  getRandomBier() {
    return this.http
      .get<Bier[]>(`${this.baseUrl}/random`)
      .pipe(map(this.formatBierResult));
  }

  getByFilters(params: string) {
    return this.http
      .get<Bier[]>(`${this.baseUrl}?${params}&per_page=50`)
      .pipe(map(this.formatBierResult));
  }

  formatBierResult = (biers: Bier[]): Bier[] => {
    return biers.map((bier: Bier) => {
      const fav = this.favouritesService.isFavourite(bier);
      return {
        id: bier.id,
        name: bier.name,
        tagline: bier.tagline,
        description: bier.description,
        image_url: bier.image_url,
        abv: bier.abv,
        food_pairing: bier.food_pairing,
        favourite: fav,
      };
    });
  };
}
