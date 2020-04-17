import { Injectable } from '@angular/core';

import { Bier } from './bier.interface';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor() {}

  getFavouritesFromStorage() {
    if (localStorage.favourites) {
      return JSON.parse(localStorage.favourites);
    } else {
      return [];
    }
  }

  setFavouritesInStorage(favourites: Bier[]) {
    localStorage.favourites = JSON.stringify(favourites);
  }

  addBierToFavourites(bier: Bier) {
    const favourites = this.getFavouritesFromStorage();
    favourites.push(bier);
    this.setFavouritesInStorage(favourites);
  }

  removeBierFromFavourites(detail: Bier) {
    const favourites = this.getFavouritesFromStorage().filter((bier: Bier) => {
      return bier.id !== detail.id;
    });
    this.setFavouritesInStorage(favourites);
  }
}
