import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BluetoothDevice } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { DeviceComponent } from '../device/device.component';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [DeviceComponent, NgFor, AsyncPipe],
  template: `
    <ul>
      <li *ngFor="let device of devices$ | async">
        <app-device [device]="device"></app-device>
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceListComponent {
  devices$ = new BehaviorSubject<BluetoothDevice[]>([]);
  @Input({ required: true })
  set devices(devices: BluetoothDevice[]) {
    console.log('devices list', devices);
    this.devices$.next(devices);
  }
}
