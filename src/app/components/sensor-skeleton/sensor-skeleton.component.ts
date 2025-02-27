import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sensor-skeleton',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sensor-skeleton.component.html',
  styleUrl: './sensor-skeleton.component.css',
})
export class SensorSkeletonComponent {
  title = 'ATD_Sensors';

  sensorString: string = 'GGGYGRYRG';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log('data from sensor chart', this.data);
    this.sensorString = this.data.sensorCode;
  }

  get sensorStatus(): string[] {
    return this.sensorString.split('');
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
}
