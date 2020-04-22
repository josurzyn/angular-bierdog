import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bier } from './bier.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FavouritesService } from './favourites.service';

@Injectable({
  providedIn: 'root',
})
export class BiersService {
  baseUrl = 'https://api.punkapi.com/v2/beers';

  constructor(
    private http: HttpClient,
    private favouritesService: FavouritesService
  ) {}

  getBiers() {
    return this.http
      .get<Bier[]>(`${this.baseUrl}?per_page=50`)
      .pipe(map(this.formatBierResult));
  }

  getRandomBier() {
    return this.http.get<Bier[]>(`${this.baseUrl}/random`).pipe(
      map(this.formatBierResult),
      // tslint:disable-next-line:no-non-null-assertion
      map((biers) => biers.shift()!)
    );
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
  }; // tslint:disable-line:semicolon
}
