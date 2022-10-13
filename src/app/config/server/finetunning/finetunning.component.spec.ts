import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinetunningComponent } from './finetunning.component';

describe('FinetunningComponent', () => {
  let component: FinetunningComponent;
  let fixture: ComponentFixture<FinetunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinetunningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinetunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
