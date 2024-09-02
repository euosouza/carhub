import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastNotificationContentComponent } from './toast-notification-content.component';

describe('ToastNotificationContentComponent', () => {
  let component: ToastNotificationContentComponent;
  let fixture: ComponentFixture<ToastNotificationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastNotificationContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastNotificationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
