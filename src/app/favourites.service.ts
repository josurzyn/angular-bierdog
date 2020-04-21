import { Injectable } from '@angular/core';

import { Bier } from './bier.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favourites: Bier[] = [];
  private favourites$$: BehaviorSubject<Bier[]> = new BehaviorSubject<Bier[]>(
    []
  );

  constructor() {
    this.favourites = this.getFavouritesFromStorage();
    this.favourites$$.next(this.favourites);
  }

  get favourites$() {
    return this.favourites$$.asObservable();
  }

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

  isFavourite(bier: Bier) {
    if (this.favourites.some((favourite: Bier) => favourite.id === bier.id)) {
      return true;
    } else {
      return false;
    }
  }

  addBierToFavourites(bier: Bier) {
    bier.favourite = true;
    this.favourites.push(bier);
    this.setFavouritesInStorage(this.favourites);
    this.favourites$$.next(this.favourites);
  }

  removeBierFromFavourites(detail: Bier) {
    detail.favourite = false;
    this.favourites = this.favourites.filter((bier: Bier) => {
      return bier.id !== detail.id;
    });
    this.setFavouritesInStorage(this.favourites);
    this.favourites$$.next(this.favourites);
    // TODO: refactor for observable/subject
    /* detail.favourite = false;
    const favourites = this.getFavouritesFromStorage().filter((bier: Bier) => {
      return bier.id !== detail.id;
    });
    this.setFavouritesInStorage(favourites);*/
  }
}
