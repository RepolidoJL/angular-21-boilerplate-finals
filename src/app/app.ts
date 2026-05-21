import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('angular-21-boilerplate');
}
