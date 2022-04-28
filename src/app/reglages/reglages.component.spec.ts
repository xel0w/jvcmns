import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglagesComponent } from './reglages.component';

describe('ReglagesComponent', () => {
  let component: ReglagesComponent;
  let fixture: ComponentFixture<ReglagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
