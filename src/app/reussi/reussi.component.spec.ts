import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReussiComponent } from './reussi.component';

describe('ReussiComponent', () => {
  let component: ReussiComponent;
  let fixture: ComponentFixture<ReussiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReussiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReussiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
