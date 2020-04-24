import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiersComponent } from './biers.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { BierDetailComponent } from '../../components/bier-detail/bier-detail/bier-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BiersComponent', () => {
  let component: BiersComponent;
  let fixture: ComponentFixture<BiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BiersComponent, FiltersComponent, BierDetailComponent],
      imports: [
        MatProgressSpinnerModule,
        MatSliderModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
