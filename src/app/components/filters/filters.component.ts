import {
  Component,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { NgForm } from '@angular/forms';

import { Search } from './search.interface';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements AfterViewInit, OnDestroy {
  // Slider values
  min = 0;
  max = 55;
  step = 0.5;
  // Default Max and Min ABV Values
  minValue = this.min;
  maxValue = this.max;

  // Style Selector
  styles = ['IPA', 'Lager', 'Pilsner', 'Weizen', 'Wheat', 'Stout', 'Porter'];

  // Form subscription
  formSub: Subscription = Subscription.EMPTY;

  @ViewChild('filtersForm') filtersForm: NgForm | undefined;

  @Output()
  updateParams: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngAfterViewInit() {
    if (this.filtersForm && this.filtersForm.valueChanges) {
      this.formSub = this.filtersForm.valueChanges.subscribe((form: Search) => {
        this.updateFilters(form);
      });
    }
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

  updateMaxValue(value: number) {
    this.maxValue = value;
  }

  updateMinValue(value: number) {
    this.minValue = value;
  }

  updateFilters(value: Search) {
    let params: string;
    // Edit min and max to account for less than / greater than
    value.maxSlider += 0.1;
    if (value.minSlider > 0) {
      value.minSlider -= 0.1;
    }
    // construct parameters
    params = `abv_lt=${value.maxSlider}&abv_gt=${value.minSlider}`;
    if (value.foodSearch) {
      params += `&food=${value.foodSearch.replace(/ /g, '_')}`;
    }
    if (value.styleSearch) {
      params += `&beer_name=${value.styleSearch}`;
    }
    this.updateParams.emit(params);
  }
}
