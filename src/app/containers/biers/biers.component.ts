import { Component, OnInit, OnDestroy } from '@angular/core';

import { Bier } from '../../bier.interface';

import { BiersService } from '../../biers.service';
import { FavouritesService } from '../../favourites.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biers',
  templateUrl: './biers.component.html',
  styleUrls: ['./biers.component.scss'],
})
export class BiersComponent implements OnInit, OnDestroy {
  apiBiers: Bier[] = [];
  // randomBier: Bier | null = null;
  surprise = false;
  isGettingBiers = false;
  randomSub: Subscription = Subscription.EMPTY;
  browseSub: Subscription = Subscription.EMPTY;
  filterSub: Subscription = Subscription.EMPTY;

  constructor(
    private biersService: BiersService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit() {
    this.getRandom();
  }

  ngOnDestroy() {
    this.randomSub.unsubscribe();
    if (this.browseSub) {
      this.browseSub.unsubscribe();
    }
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
  }

  // Get 50 beers on browse button click
  handleBrowse() {
    if (this.surprise) {
      this.surprise = false;
    }
    // Remove random bier from view
    /*if (this.randomBier) {
      this.randomBier = null;
    }*/
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      if (this.browseSub) {
        this.browseSub.unsubscribe();
      }
      //
      // const favourites = this.favouritesService.getFavouritesFromStorage();
      console.log('got favs in browse');
      //
      this.browseSub = this.biersService
        .getBiers()
        .subscribe((data: Bier[]) => {
          this.assignBiers(data);
          /*
          data.forEach((bier: Bier) => {
            const newBier: Bier = {
              id: 0,
              name: '',
              tagline: '',
              description: '',
              image_url: null,
              abv: 0,
              food_pairing: [],
              favourite: false,
            };
            newBier.id = bier.id;
            newBier.name = bier.name;
            newBier.tagline = bier.tagline;
            newBier.description = bier.description;
            newBier.image_url = bier.image_url;
            newBier.abv = bier.abv;
            newBier.food_pairing = bier.food_pairing;
            if (favourites.some((fav: Bier) => fav.id === bier.id)) {
              console.log(bier.id);
              newBier.favourite = true;
            }
            this.apiBiers.push(newBier);
          });*/
          //          this.apiBiers = data;
          this.isGettingBiers = false;
        });
    }
  }

  // refactor test
  assignBiers(data: Bier[]) {
    if (this.apiBiers.length > 0) {
      this.apiBiers = [];
    }
    const favourites = this.favouritesService.getFavouritesFromStorage();
    data.forEach((bier: Bier) => {
      const newBier: Bier = {
        id: 0,
        name: '',
        tagline: '',
        description: '',
        image_url: null,
        abv: 0,
        food_pairing: [],
        favourite: false,
      };
      newBier.id = bier.id;
      newBier.name = bier.name;
      newBier.tagline = bier.tagline;
      newBier.description = bier.description;
      newBier.image_url = bier.image_url;
      newBier.abv = bier.abv;
      newBier.food_pairing = bier.food_pairing;
      if (favourites.some((fav: Bier) => fav.id === bier.id)) {
        console.log(bier.id);
        newBier.favourite = true;
      }
      this.apiBiers.push(newBier);
    });
  }

  // Get random bier on Surpise me click
  getRandom() {
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      if (this.randomSub) {
        this.randomSub.unsubscribe();
      }
      this.randomSub = this.biersService
        .getRandomBier()
        .subscribe((data: Bier[]) => {
          // this.randomBier = data[0];
          this.assignBiers(data);
          this.isGettingBiers = false;
          this.surprise = true;
        });
    }
    // console.log('random bier is', this.randomBier);
  }

  // Get biers by filters whenever filters are changed
  onUpdateParams(params: string) {
    if (this.surprise) {
      this.surprise = false;
    }
    // Remove random bier from view
    /* if (this.randomBier) {
      this.randomBier = null;
    }*/
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      if (this.filterSub) {
        this.filterSub.unsubscribe();
      }
      this.filterSub = this.biersService
        .getByFilters(params)
        .subscribe((data: Bier[]) => {
          this.assignBiers(data);
          // this.apiBiers = data;
          this.isGettingBiers = false;
        });
    }
  }

  get noBiersFound() {
    if (
      this.apiBiers.length === 0 &&
      // !this.randomBier &&
      !this.isGettingBiers
    ) {
      return true;
    } else {
      return false;
    }
  }
}
