import { Component } from '@angular/core';

import { FavouritesService } from './favourites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BierDog';

  favouritesCount$: Observable<number>;

  constructor(private favouritesService: FavouritesService) {
    this.favouritesCount$ = this.favouritesService.favouritesCount$;
  }
}
