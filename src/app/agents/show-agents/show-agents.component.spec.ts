import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgentsComponent } from './show-agents.component';

describe('ShowAgentsComponent', () => {
  let component: ShowAgentsComponent;
  let fixture: ComponentFixture<ShowAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
