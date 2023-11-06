import { Injectable, inject } from '@angular/core';
import { BluetoothDevice, IpcRendererEvent } from 'electron';
import { BehaviorSubject, EMPTY, Observable, from, switchMap, tap } from 'rxjs';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root',
})
export class BluetoothService {
  readonly #electronService = inject(ElectronService);

  readonly #connectedDevice$ = new BehaviorSubject<BluetoothDevice | null>(
    null
  );
  readonly #scannedDevices$ = new BehaviorSubject<BluetoothDevice[]>([]);

  readonly scannedDevices$ = this.#scannedDevices$.asObservable();
  readonly connectedDevice$ = this.#connectedDevice$.asObservable();

  connectDevice(device: BluetoothDevice) {
    this.#electronService.ipcRenderer.send('webble-selected', device.deviceId);
    this.#connectedDevice$.next(device);
  }

  scanDevicesEletron(): void {
    if (this.#electronService.isElectron) {
      this.#electronService.ipcRenderer.on(
        'webble-scan',
        (_: IpcRendererEvent, devices: BluetoothDevice[]) => {
          console.log('scan');
          this.#scannedDevices$.next(devices);
        }
      );
    }
  }

  scanDevices$(): Observable<any> {
    return from(
      navigator.bluetooth.requestDevice({ acceptAllDevices: true })
    ).pipe(
      tap((device) => {
        console.log('device ici', device);
      }),
      switchMap(() => EMPTY)
    );
  }
}
