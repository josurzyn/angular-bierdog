import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BierDetailComponent } from './bier-detail.component';

describe('BierDetailComponent', () => {
  let component: BierDetailComponent;
  let fixture: ComponentFixture<BierDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BierDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
