import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercrggComponent } from './headercrgg.component';

describe('HeadercrggComponent', () => {
  let component: HeadercrggComponent;
  let fixture: ComponentFixture<HeadercrggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadercrggComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercrggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
