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
  randomBier: Bier | undefined;
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

  // Get random bier on Surpise me click
  getRandom() {
    this.clearCurrentBiers();
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      if (this.randomSub) {
        this.randomSub.unsubscribe();
      }
      this.randomSub = this.biersService
        .getRandomBier()
        .subscribe((data: Bier) => {
          this.randomBier = data;
          this.isGettingBiers = false;
        });
    }
  }

  // Get 50 beers on browse button click
  handleBrowse() {
    this.clearCurrentBiers();
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      if (this.browseSub) {
        this.browseSub.unsubscribe();
      }
      this.browseSub = this.biersService
        .getBiers()
        .subscribe((data: Bier[]) => {
          this.apiBiers = data;
          this.isGettingBiers = false;
        });
    }
  }

  // Get biers by filters whenever filters are changed
  onUpdateParams(params: string) {
    this.clearCurrentBiers();
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      if (this.filterSub) {
        this.filterSub.unsubscribe();
      }
      this.filterSub = this.biersService
        .getByFilters(params)
        .subscribe((data: Bier[]) => {
          this.apiBiers = data;
          this.isGettingBiers = false;
          // Sort results to show favourites first
          this.apiBiers.sort(
            (a, b) => Number(b.favourite) - Number(a.favourite)
          );
        });
    }
  }

  clearCurrentBiers() {
    if (this.randomBier) {
      this.randomBier = undefined;
    }
    if (this.apiBiers.length > 0) {
      this.apiBiers = [];
    }
  }

  get noBiersFound() {
    if (
      this.apiBiers.length === 0 &&
      !this.isGettingBiers &&
      !this.randomBier
    ) {
      return true;
    } else {
      return false;
    }
  }
}
