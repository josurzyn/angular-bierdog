import { Component, OnInit, OnDestroy } from '@angular/core';

import { Bier } from '../../models/bier.interface';

import { BiersService } from '../../biers.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biers',
  templateUrl: './biers.component.html',
  styleUrls: ['./biers.component.scss']
})
export class BiersComponent implements OnInit, OnDestroy {

  apiBiers: Bier[] = [];
  randomBier: Bier;
  isGettingBiers: boolean = false;
  randomSub: Subscription;
  browseSub: Subscription;
  filterSub: Subscription;

  constructor( private biersService: BiersService ) { }

  ngOnInit() {
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      this.randomSub = this.biersService
      .getRandomBier()
      .subscribe((data: Bier) => {
        this.randomBier = data[0];
        this.isGettingBiers = false;
      });
    }
  }

  ngOnDestroy() {
    this.randomSub.unsubscribe;
    if(this.browseSub) {
      this.browseSub.unsubscribe;
    }
    if (this.filterSub) {
      this.filterSub.unsubscribe;
    }
  }

  // Get 50 beers on browse button click
  handleBrowse() {
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      this.browseSub = this.biersService
        .getBiers()
        .subscribe((data: Bier[]) => {
          this.apiBiers = data;
          this.isGettingBiers = false;
        });
    }
    // Remove random bier from view
    if (this.randomBier) {
      this.randomBier = null;
    }
  }

  // Get random bier on Surpise me click
  handleRandom() {
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      this.randomSub = this.biersService
        .getRandomBier()
        .subscribe((data: Bier) => {
        this.randomBier = data[0];
        this.isGettingBiers = false;
      });
    }

  }

  // Get biers by filters whenever filters are changed
  onUpdateParams(params: string) {
    // Remove random bier from view
    if (this.randomBier) {
      this.randomBier = null;
    }
    if (!this.isGettingBiers) {
      this.isGettingBiers = true;
      this.filterSub = this.biersService
        .getByFilters(params)
        .subscribe((data: Bier[]) => {
          this.apiBiers = data;
          this.isGettingBiers = false;
        });
    }

  }

}
