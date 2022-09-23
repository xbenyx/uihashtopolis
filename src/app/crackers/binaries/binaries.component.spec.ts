import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinariesComponent } from './binaries.component';

describe('BinariesComponent', () => {
  let component: BinariesComponent;
  let fixture: ComponentFixture<BinariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
