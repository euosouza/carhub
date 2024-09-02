import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOneVehicleComponent } from './find-one-vehicle.component';

describe('FindOneVehicleComponent', () => {
  let component: FindOneVehicleComponent;
  let fixture: ComponentFixture<FindOneVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindOneVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindOneVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
