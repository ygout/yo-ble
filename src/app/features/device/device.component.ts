import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BluetoothDevice } from 'electron';
import { BluetoothService } from '../../core/services/bluetooth/bluetooth.service';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf],
  template: `
 <mat-card *ngIf="device">
  <mat-card-header>
    <mat-card-title>{{device.deviceId}} - {{device.deviceName}}</mat-card-title>
  </mat-card-header>
  <mat-card-actions>
    <button mat-raised-button color="primary" (click)="connectDevice(device)">Se connecter</button>
  </mat-card-actions>
</mat-card>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent {

  readonly #bleService = inject(BluetoothService);

  @Input({required: true})device!: BluetoothDevice;

  connectDevice(device: BluetoothDevice) {
    this.#bleService.connectDevice(device);
  }

}
