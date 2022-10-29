import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { Bier } from '../../bier.interface';
import { BiersService } from '../../services/biers.service';

@Component({
  selector: 'app-biers',
  templateUrl: './biers.component.html',
  styleUrls: ['./biers.component.scss'],
})
export class BiersComponent implements OnInit {
  private biers$$ = new BehaviorSubject<Bier[]>([]);
  biers$ = this.biers$$.asObservable();

  isGettingBiers$$ = new BehaviorSubject<boolean>(true);

  constructor(private biersService: BiersService) {}

  ngOnInit() {
    this.getRandom();
  }

  // Get random bier on Surpise me click
  getRandom() {
    this.getBiers(this.biersService.getRandomBier());
  }

  // Get 50 beers on browse button click
  handleBrowse() {
    this.getBiers(this.biersService.getBiers());
  }

  // Get biers by filters whenever filters are changed
  onUpdateParams(params: string) {
    this.getBiers(this.biersService.getByFilters(params));
  }

  getBiers(endpoint: Observable<Bier[]>) {
    this.isGettingBiers$$.next(true);

    endpoint
      .pipe(
        take(1),
        finalize(() => this.isGettingBiers$$.next(false))
      )
      .subscribe((bier) => {
        const sorted = bier.sort(
          (a, b) => Number(b.favourite) - Number(a.favourite)
        );
        this.biers$$.next(sorted);
      });
  }
}
