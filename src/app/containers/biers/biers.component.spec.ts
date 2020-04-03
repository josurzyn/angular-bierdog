import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiersComponent } from './biers.component';

describe('BiersComponent', () => {
  let component: BiersComponent;
  let fixture: ComponentFixture<BiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiersComponent ]
    })
    .compileComponents();
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
