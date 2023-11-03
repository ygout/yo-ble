import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_CONFIG } from '../environments/environment';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  imports: [RouterOutlet],
  standalone: true,
})
export class AppComponent {
  constructor(private electronService: ElectronService) {
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      // bluetooth connection
      // const bluetooth = require('node-bluetooth');
      // const device = new bluetooth.DeviceINQ();
      // device
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      console.log('webContents', this.electronService.webContents);
    } else {
      console.log('Run in browser');
    }
  }
}
