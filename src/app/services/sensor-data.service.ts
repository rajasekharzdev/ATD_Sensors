import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { sensorObject } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  sensorObject: Subject<any[]> = new Subject<any[]>();

  getSensorObject() {
    return this.sensorObject;
  }

  setSensorObject(newObject: any[]) {
    this.sensorObject.next(newObject);
  }
}
