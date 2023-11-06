/// <reference types="web-bluetooth" />
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BluetoothDevice } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { BluetoothService } from '../../core/services/bluetooth/bluetooth.service';
import { DeviceListComponent } from '../device-list/device-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DeviceListComponent, MatButtonModule, AsyncPipe],
  template: `
    <section>
      <app-device-list [devices]="(devices$ | async) ?? []"></app-device-list>
      <button mat-raised-button color="primary" (click)="requestDevice()">
        Request Device
      </button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly #bleService = inject(BluetoothService);
  readonly #cdr = inject(ChangeDetectorRef);

  devices: BluetoothDevice[] = [];
  devices$ = new BehaviorSubject<BluetoothDevice[]>([]);

  constructor() {
    this.#bleService.scannedDevices$.subscribe({
      next: (devices) => {
        this.devices$.next(devices);
        this.#cdr.detectChanges();
      },
    });
  }

  requestDevice() {
    this.#bleService.scanDevicesEletron();
    this.#bleService.scanDevices$().subscribe();
  }
}
