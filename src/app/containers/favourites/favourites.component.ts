import { Component, OnInit } from '@angular/core';

import { FavouritesService } from '../../favourites.service';

import { Bier } from '../../bier.interface';

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
  }

  getFavourites() {
    this.favourites = this.favouritesService.getFavouritesFromStorage();
  }

  onUpdate() {
    setTimeout(() => {
      this.getFavourites();
    }, 400);
  }
}
