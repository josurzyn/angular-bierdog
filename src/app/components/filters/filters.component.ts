import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  // Slider values
  min: number = 0;
  max: number = 55;
  step: number = 0.5;
  // Default Max and Min ABV Values
  minValue: number = this.min;
  maxValue: number = this.max;
  
  // Style Selector
  styles: string[] = [
    'IPA',
    'Lager',
    'Pilsner',
    'Weizen',
    'Wheat',
    'Stout',
    'Porter'
  ]

  params: string;

  @Output()
  updateParams: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  updateMaxValue(value: number) {
    this.maxValue = value;
  }

  updateMinValue(value: number) {
    this.minValue = value;
  }

  modelChange(value) {
    // Edit min and max to account for less than / greater than
    value.maxSlider += 0.5;
    if (value.minSlider > 0 ){
      value.minSlider -= 0.5;
    }
    // construct parameters
    this.params = `abv_lt=${value.maxSlider}&abv_gt=${value.minSlider}`;
    if (value.foodSearch) {
      this.params += `&food=${value.foodSearch.replace(/ /g, "_")}`;
    }
    if (value.styleSearch) {
      this.params += `&beer_name=${value.styleSearch}`;
    }
    this.updateParams.emit(this.params);
  }
}
