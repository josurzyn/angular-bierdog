import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BierDetailComponent } from './bier-detail.component';

describe('BierDetailComponent', () => {
  let component: BierDetailComponent;
  let fixture: ComponentFixture<BierDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BierDetailComponent],
      imports: [MatCardModule],
    }).compileComponents();
    fixture = TestBed.createComponent(BierDetailComponent);
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get image url if available', () => {
    component.detail = {
      id: 0,
      name: '',
      abv: 0,
      image_url: 'image',
    };
    const url = component.image;
    expect(url).toBe('image');
  });

  it('should get placeholder if img url not available', () => {
    component.detail = {
      id: 0,
      name: '',
      abv: 0,
      image_url: null,
    };
    const url = component.image;
    expect(url).toBe('../assets/img/bier-dog-bottle.png');
  });

  it('should get a full heart img for favourite', () => {
    component.detail = {
      id: 0,
      name: '',
      abv: 0,
      image_url: '',
      favourite: true,
    };
    const heart = component.heartImg;
    expect(heart).toBe('../assets/img/heart-fill.png');
  });

  it('should get full heart alt text for favourite', () => {
    component.detail = {
      id: 0,
      name: '',
      abv: 0,
      image_url: '',
      favourite: true,
    };
    const heartAlt = component.heartAlt;
    expect(heartAlt).toBe('full heart - bier is in favourites');
  });

  it('should get a blank heart img if not favourite', () => {
    component.detail = {
      id: 0,
      name: '',
      abv: 0,
      image_url: '',
      favourite: false,
    };
    const heart = component.heartImg;
    expect(heart).toBe('../assets/img/heart-blank.png');
  });

  it('should get blank heart alt text if not favourite', () => {
    component.detail = {
      id: 0,
      name: '',
      abv: 0,
      image_url: '',
      favourite: false,
    };
    const heartAlt = component.heartAlt;
    expect(heartAlt).toBe('blank heart - add bier to favourites');
  });
});
