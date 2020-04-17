import { Component, OnInit } from '@angular/core';

import { FavouritesService } from '../../favourites.service';

import { Bier } from '../../bier.interface';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favourites: Bier[] = [];

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit() {
    this.getFavourites();
    console.log(this.favourites);
  }

  getFavourites() {
    this.favourites = this.favouritesService.getFavouritesFromStorage();
  }

  onUpdate() {
    this.getFavourites();
  }
}
