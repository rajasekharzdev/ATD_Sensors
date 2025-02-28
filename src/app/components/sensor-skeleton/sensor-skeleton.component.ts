import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-sensor-skeleton',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './sensor-skeleton.component.html',
  styleUrl: './sensor-skeleton.component.css',
})
export class SensorSkeletonComponent {
  sensorString: string = '';
  formModel: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private socket: Socket,
    private dialogRef: MatDialogRef<SensorSkeletonComponent>
  ) {}

  ngOnInit() {
    this.sensorString = this.data.singleRecord.sensorCode;
    this.formModel = {
      serialNo: this.data.singleRecord.serialNo,
      sensorCode: this.data.singleRecord.sensorCode,
      fromTime: this.data.singleRecord.fromTime,
      toTime: this.data.singleRecord.toTime,
    };
  }

  get sensorStatus(): string[] {
    return this.formModel.sensorCode.split('');
  }

  getColor(status: string): string {
    switch (status) {
      case 'G':
        return 'green';
      case 'R':
        return 'red';
      case 'Y':
        return 'yellow';
      default:
        return 'gray';
    }
  }

  updateSensorRecord() {
    var index = this.data.history.findIndex(
      (value: any) => value.serialNo == this.formModel.serialNo
    );
    this.data.history[index] = this.formModel;
    this.socket.emit('update-sensor-record', this.data.history);
    this.dialogRef.close();
  }
}
