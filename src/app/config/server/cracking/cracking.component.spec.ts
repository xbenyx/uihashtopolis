import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrackingComponent } from './cracking.component';

describe('CrackingComponent', () => {
  let component: CrackingComponent;
  let fixture: ComponentFixture<CrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
