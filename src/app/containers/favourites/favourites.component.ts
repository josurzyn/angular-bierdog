import { Component } from '@angular/core';

import { FavouritesService } from '../../services/favourites.service';

import { Bier } from '../../bier.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  favourites$: Observable<Bier[]>;

  constructor(private favouritesService: FavouritesService) {
    this.favourites$ = this.favouritesService.favourites$;
  }
}
