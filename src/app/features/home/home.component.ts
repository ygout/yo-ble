/// <reference types="web-bluetooth" />
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { IpcRendererEvent, BluetoothDevice } from 'electron';
import { ElectronService } from '../../core/services';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>home works!

    <button (click)="requestDevice()">Request Device</button>
  </p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly #electronService = inject(ElectronService);
  readonly devicesSig: WritableSignal<BluetoothDevice[]> = signal([]);

  requestDevice() {
    this.#electronService.ipcRenderer.on('webble-scan', (_: IpcRendererEvent, devices: BluetoothDevice[]) => {
      console.log('devices home 2', devices);
      this.devicesSig.set(devices);
    });

    from(navigator.bluetooth.requestDevice({ acceptAllDevices: true })).subscribe({
      next: (device) => console.log('device ici',device),
      error: (error) => console.log(error),
      complete: () => console.log('finished'),
    });
  }
}
