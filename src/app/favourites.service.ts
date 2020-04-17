import { Injectable } from '@angular/core';

import { Bier } from './bier.interface';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor() {}

  getFavouritesFromStorage() {
    console.log('getting');
    if (localStorage.favourites) {
      return JSON.parse(localStorage.favourites);
    } else {
      return [];
    }
  }

  setFavouritesInStorage(favourites: Bier[]) {
    console.log('setting');
    localStorage.favourites = JSON.stringify(favourites);
  }

  addBierToFavourites(bier: Bier) {
    console.log('adding');
    const favourites = this.getFavouritesFromStorage();
    favourites.push(bier);
    this.setFavouritesInStorage(favourites);
  }

  removeBierFromFavourites(detail: Bier) {
    console.log('removing');
    detail.favourite = false;
    const favourites = this.getFavouritesFromStorage().filter((bier: Bier) => {
      return bier.id !== detail.id;
    });
    this.setFavouritesInStorage(favourites);
  }
}
