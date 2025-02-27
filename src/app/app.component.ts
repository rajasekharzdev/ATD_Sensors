import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SensorChartComponent } from './components/sensor-chart/sensor-chart.component';
import { sensorObject } from './models/sensor.model';
import { SensorDataService } from './services/sensor-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, SensorChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  sensorChartObject: sensorObject = {
    serialNo: 0,
    sensorCode: '',
    fromTime: '',
    toTime: '',
  };
  constructor(private sensorDataService: SensorDataService) {}
  ngOnInit() {
    let sensorStringGenerator = [];
    let sNo = 0;
    let clearTimeStamp = 0;
    let interval = setInterval(() => {
      let timeObject = new Date();
      const milliseconds = 10 * 1000;
      timeObject = new Date(timeObject.getTime() + milliseconds);
      clearTimeStamp += 1;
      this.sensorChartObject = {
        serialNo: sNo++,
        sensorCode: this.randomCharctergenration(),
        fromTime: new Date().toString(),
        toTime: timeObject.toString(),
      };
      sensorStringGenerator.push(this.sensorChartObject);
      if (clearTimeStamp == 10) {
        clearInterval(interval);
      }
      this.sensorDataService.setSensorObject(sensorStringGenerator);
      console.log('sensor', sensorStringGenerator);
    }, 10000);
  }

  randomCharctergenration() {
    let result = '';
    const characters = 'GGGYGRYRR';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < charactersLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
