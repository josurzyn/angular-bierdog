import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Search } from '../../models/search.interface';

@Component({
  selector: 'app-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  // Slider values
  min = 0;
  max = 55;
  step = 0.5;
  // Default Max and Min ABV Values
  minValue = this.min;
  maxValue = this.max;

  // Style Selector
  styles = ['IPA', 'Lager', 'Pilsner', 'Weizen', 'Wheat', 'Stout', 'Porter'];

  @Output()
  updateParams: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

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
