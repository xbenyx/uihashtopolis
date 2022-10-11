import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistEditComponent } from './wordlist-edit.component';

describe('WordlistEditComponent', () => {
  let component: WordlistEditComponent;
  let fixture: ComponentFixture<WordlistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
