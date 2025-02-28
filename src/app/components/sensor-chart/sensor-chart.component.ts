import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  inject,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SensorSkeletonComponent } from '../sensor-skeleton/sensor-skeleton.component';
import { sensorObject } from '../../models/sensor.model';
import { SensorDataService } from '../../services/sensor-data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { Observable, Subject, takeUntil } from 'rxjs';

const initialSelection: never[] = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-sensor-chart',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sensor-chart.component.html',
  styleUrl: './sensor-chart.component.css',
})
export class SensorChartComponent implements OnDestroy {
  displayedColumns: string[] = ['serialNo', 'sensorCode', 'fromTime', 'toTime'];
  dataSource!: any;
  historyDataSource!: any;
  selection: any;
  readonly dialog = inject(MatDialog);
  unsubscribe$ = new Subject<void>();

  constructor(
    private sensorDataService: SensorDataService,
    private _ngZone: NgZone,
    private socket: Socket
  ) {
    this.selection = new SelectionModel<any>(
      allowMultiSelect,
      initialSelection
    );
    this._ngZone.run(() => {
      this.sensorDataService
        .getSensorObject()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource(
            data.sort(({ serialNo: a }, { serialNo: b }) => b - a)
          );
          this.socket.emit('update-sensor-chart', data);
        });
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
    this.openDialog({ singleRecord: event, history: this.historyDataSource });
  }

  sensorTabs(event: any) {
    if (event.index == 1) {
      this.socket
        .fromEvent('get-history')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.historyDataSource = JSON.parse(data);
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
