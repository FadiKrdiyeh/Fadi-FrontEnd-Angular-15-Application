import { RoutingAnimation } from './shared/animations/routing.animation';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RoutingAnimation]
})
export class AppComponent {
  title = 'FadiFrontEndAngularApplication';
}
