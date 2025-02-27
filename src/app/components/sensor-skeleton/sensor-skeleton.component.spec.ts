import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorSkeletonComponent } from './sensor-skeleton.component';

describe('SensorSkeletonComponent', () => {
  let component: SensorSkeletonComponent;
  let fixture: ComponentFixture<SensorSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
