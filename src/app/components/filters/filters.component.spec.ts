import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Search } from './search.interface';
import { Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let formSubscription: Subscription | undefined;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [
        FormsModule,
        MatSliderModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (formSubscription) {
      formSubscription.unsubscribe();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update max value', () => {
    component.updateMaxValue(10);
    expect(component.maxValue).toBe(10);
  });

  it('should update min value', () => {
    component.updateMinValue(4);
    expect(component.minValue).toBe(4);
  });

  it('should update filters on form change', (done) => {
    component.minValue = 5;
    fixture.detectChanges();

    formSubscription = component.filtersForm?.valueChanges?.subscribe(
      (form) => {
        expect(form.minSlider).toBe(5);
        done();
      }
    );
  });

  it('should output search as parameters', (done) => {
    const input = fixture.debugElement.query(By.css('input[name="foodSearch"]'))
      .nativeElement;

    input.value = 'chips';

    input.dispatchEvent(new Event('input'));

    const search: Search = {
      minSlider: 4,
      maxSlider: 7,
      styleSearch: 'ipa',
      foodSearch: 'chips',
    };

    component.updateParams.pipe(take(1)).subscribe((params: string) => {
      expect(params).toBe('abv_lt=7.1&abv_gt=3.9&food=chips&beer_name=ipa');
      done();
    });
    component.updateFilters(search);
  });
});
