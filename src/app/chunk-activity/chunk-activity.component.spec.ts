import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkActivityComponent } from './chunk-activity.component';

describe('ChunkActivityComponent', () => {
  let component: ChunkActivityComponent;
  let fixture: ComponentFixture<ChunkActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChunkActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
