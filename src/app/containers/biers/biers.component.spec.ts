import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BiersComponent } from './biers.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { BierDetailComponent } from '../../components/bier-detail/bier-detail/bier-detail.component';
import { Bier } from '../../bier.interface';

describe('BiersComponent', () => {
  let component: BiersComponent;
  let fixture: ComponentFixture<BiersComponent>;
  const biers: Bier[] = [
    {
      id: 0,
      name: 'first bier',
      image_url: '',
      abv: 5,
    },
    {
      id: 1,
      name: 'second bier',
      image_url: '',
      abv: 7,
    },
    {
      id: 2,
      name: 'third bier',
      image_url: '',
      abv: 4,
    },
  ];

  const randomBier: Bier = {
    id: 4,
    name: 'random bier',
    image_url: '',
    abv: 8,
  };

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
