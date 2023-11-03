import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>home works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}