import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBinaryComponent } from './new-binary.component';

describe('NewBinaryComponent', () => {
  let component: NewBinaryComponent;
  let fixture: ComponentFixture<NewBinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBinaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
