import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { FavouritesService } from '../../../favourites.service';

import { Bier } from '../../../bier.interface';

@Component({
  selector: 'app-bier-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bier-detail.component.html',
  styleUrls: ['./bier-detail.component.scss'],
})
export class BierDetailComponent implements OnInit {
  @Input()
  // tslint: override non-null assertion
  detail!: Bier;

  placeholder = '../assets/img/bier-dog-bottle.png';

  heartBlank = '../assets/img/heart-blank.png';
  heartFill = '../assets/img/heart-fill.png';

  // btnText = 'favourite';

  favourites: Bier[] = [];

  @Output()
  update: EventEmitter<any> = new EventEmitter<any>();

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit() {
    // this.setBtnText();
  }

  get image(): string {
    if (this.detail && this.detail.image_url) {
      // if (this.detail.image_url) {
      return this.detail.image_url;
    } else {
      return this.placeholder;
    }
    // }
    // return '';
  }

  get heart(): string {
    if (this.detail.favourite) {
      return this.heartFill;
    } else {
      return this.heartBlank;
    }
  }

  /* setBtnText() {
    // One way to check if bier already exists in favourites
    const favourites = this.favouritesService.getFavouritesFromStorage();
    favourites.forEach((bier: Bier) => {
      if (this.detail.id === bier.id) {
        this.detail.favourite = true;
      }
    });
    // The other way to check
    if (this.detail.favourite) {
      this.btnText = 'unfavourite';
    } else {
      this.btnText = 'favourite';
    }
  }*/

  favourite() {
    // to favourite
    if (!this.detail.favourite) {
      this.detail.favourite = true;
      // this.btnText = 'unfavourite';
      this.favouritesService.addBierToFavourites(this.detail);
    } else {
      // to unfavourite
      // this.btnText = 'favourite';
      this.favouritesService.removeBierFromFavourites(this.detail);
      this.update.emit();
    }
  }
}
