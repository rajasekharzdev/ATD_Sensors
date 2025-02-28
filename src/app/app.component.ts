import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class AppComponent {
  sensorChartObject: sensorObject = {
    serialNo: 0,
    sensorCode: '',
    fromTime: '',
    toTime: '',
  };
  constructor(private sensorDataService: SensorDataService) {
    let sensorStringGenerator = [];
    let sNo = 0;
    var timesRun = 0;
    var interval = setInterval(() => {
      let timeObject = new Date();
      const milliseconds = 10 * 1000;
      timeObject = new Date(timeObject.getTime() + milliseconds);
      this.sensorChartObject = {
        serialNo: ++sNo,
        sensorCode: this.randomCharcterGenration(),
        fromTime: new Date().toLocaleString(),
        toTime: timeObject.toLocaleString(),
      };
      sensorStringGenerator.push(this.sensorChartObject);
      this.sensorDataService.setSensorObject(sensorStringGenerator);
      timesRun += 1;
      if (timesRun === 100) {
        clearInterval(interval);
      }
    }, 10000);
  }

  randomCharcterGenration() {
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
