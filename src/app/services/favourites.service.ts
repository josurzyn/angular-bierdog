import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bier } from '../bier.interface';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favourites$$ = new BehaviorSubject<Bier[]>([]);
  favourites$ = this.favourites$$.asObservable();
  favouritesCount$ = this.favourites$$.pipe(map((biers) => biers.length));

  constructor() {
    const favourites = this.getFavouritesFromStorage();
    this.favourites$$.next(favourites);
  }

  private getFavouritesFromStorage(): Bier[] {
    return localStorage.favourites ? JSON.parse(localStorage.favourites) : [];
  }

  private setFavouritesInStorage(favourites: Bier[]) {
    localStorage.favourites = JSON.stringify(favourites);
  }

  isFavourite(bier: Bier) {
    const favourites = this.getFavouritesFromStorage();
    return favourites.some((favourite: Bier) => favourite.id === bier.id);
  }

  addBierToFavourites(bier: Bier) {
    bier.favourite = true;
    const favourites = this.getFavouritesFromStorage();
    favourites.push(bier);
    this.setFavouritesInStorage(favourites);
    this.favourites$$.next(favourites);
  }

  removeBierFromFavourites(detail: Bier) {
    detail.favourite = false;
    const favourites = this.getFavouritesFromStorage().filter(
      (bier) => bier.id !== detail.id
    );
    this.setFavouritesInStorage(favourites);
    this.favourites$$.next(favourites);
  }
}
