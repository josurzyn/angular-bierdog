import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FavouritesService } from '../../../services/favourites.service';
import { Bier } from '../../../bier.interface';
import { Heart } from './heart.interface';

@Component({
  selector: 'app-bier-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bier-detail.component.html',
  styleUrls: ['./bier-detail.component.scss'],
})
export class BierDetailComponent {
  @Input()
  detail: Bier | undefined;

  placeholder = '../assets/img/bier-dog-bottle.png';

  heartBlank: Heart = {
    src: '../assets/img/heart-blank.png',
    alt: 'blank heart - add bier to favourites',
  };
  heartFill: Heart = {
    src: '../assets/img/heart-fill.png',
    alt: 'full heart - bier is in favourites',
  };

  constructor(private favouritesService: FavouritesService) {}

  get image() {
    if (this.detail && this.detail.image_url) {
      return this.detail.image_url;
    } else {
      return this.placeholder;
    }
  }

  get heartImg() {
    if (this.detail && this.detail.favourite) {
      return this.heartFill.src;
    } else {
      return this.heartBlank.src;
    }
  }

  get heartAlt(): string {
    if (this.detail && this.detail.favourite) {
      return this.heartFill.alt;
    } else {
      return this.heartBlank.alt;
    }
  }

  favourite() {
    if (this.detail) {
      if (!this.detail.favourite) {
        this.favouritesService.addBierToFavourites(this.detail);
      } else {
        this.favouritesService.removeBierFromFavourites(this.detail);
      }
    }
  }
}
