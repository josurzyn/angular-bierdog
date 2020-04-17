import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { FavouritesService } from '../../../favourites.service';

import { Bier } from '../../../bier.interface';

@Component({
  selector: 'app-bier-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bier-detail.component.html',
  styleUrls: ['./bier-detail.component.scss'],
})
export class BierDetailComponent {
  @Input()
  // tslint: override non-null assertion
  detail!: Bier;

  placeholder = '../assets/img/bier-dog-bottle.png';

  btnText = 'favourite';

  favourites: Bier[] = [];

  constructor(private favouritesService: FavouritesService) {}

  get image(): string {
    if (this.detail) {
      if (this.detail.image_url) {
        return this.detail.image_url;
      } else {
        return this.placeholder;
      }
    }
    return '';
  }

  favourite() {
    if (this.btnText === 'favourite') {
      this.btnText = 'unfavourite';
      this.favouritesService.addBierToFavourites(this.detail);
    } else {
      this.btnText = 'favourite';
      this.favouritesService.removeBierFromFavourites(this.detail);
    }
  }
}
