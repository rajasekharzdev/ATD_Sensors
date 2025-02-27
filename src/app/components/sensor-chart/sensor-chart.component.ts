import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SensorSkeletonComponent } from '../sensor-skeleton/sensor-skeleton.component';
import { sensorObject } from '../../models/sensor.model';
import { SensorDataService } from '../../services/sensor-data.service';

const ELEMENT_DATA: sensorObject[] = [
  { serialNo: 1, sensorCode: 'GGGYGRYRR', fromTime: '', toTime: 'H' },
  { serialNo: 2, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'He' },
  { serialNo: 3, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'Li' },
  { serialNo: 4, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'Be' },
  { serialNo: 5, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'B' },
  { serialNo: 6, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'C' },
  { serialNo: 7, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'N' },
  { serialNo: 8, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'O' },
  { serialNo: 9, sensorCode: 'GGGYGRYRG', fromTime: '', toTime: 'F' },
  { serialNo: 10, sensorCode: 'RRRRRRRRR', fromTime: '', toTime: 'Ne' },
];

const initialSelection: never[] = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-sensor-chart',
  standalone: true,
  imports: [MatTableModule, MatDialogModule],
  templateUrl: './sensor-chart.component.html',
  styleUrl: './sensor-chart.component.css',
})
export class SensorChartComponent implements OnChanges {
  displayedColumns: string[] = ['serialNo', 'sensorCode', 'fromTime', 'toTime'];
  dataSource!: any;
  selection: any;
  readonly dialog = inject(MatDialog);

  constructor(private sensorDataService: SensorDataService) {
    this.selection = new SelectionModel<any>(
      allowMultiSelect,
      initialSelection
    );
  }

  ngOnChanges() {
    this.sensorDataService.getSensorObject().subscribe((data) => {
      this.dataSource = data;
    });
  }
  openDialog(event: any): void {
    this.dialog.open(SensorSkeletonComponent, {
      width: '90vw',
      height: '90vh',
      data: event,
    });
  }

  senorSelected(event: any) {
    console.log('event', event);
    this.openDialog(event);
  }
}
