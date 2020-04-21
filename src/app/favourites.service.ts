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
  private favouritesCount$$: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(0);

  constructor() {
    this.favourites = this.getFavouritesFromStorage();
    this.favourites$$.next(this.favourites);
    this.favouritesCount$$.next(this.favourites.length);
  }

  get favourites$() {
    return this.favourites$$.asObservable();
  }

  get favouritesCount$() {
    return this.favouritesCount$$.asObservable();
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
    this.favouritesCount$$.next(this.favourites.length);
  }

  removeBierFromFavourites(detail: Bier) {
    detail.favourite = false;
    this.favourites = this.favourites.filter((bier: Bier) => {
      return bier.id !== detail.id;
    });
    this.setFavouritesInStorage(this.favourites);
    this.favourites$$.next(this.favourites);
    this.favouritesCount$$.next(this.favourites.length);
  }
}
