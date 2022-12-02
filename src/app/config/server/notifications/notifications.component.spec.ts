import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsConfigComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsConfigComponent;
  let fixture: ComponentFixture<NotificationsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
