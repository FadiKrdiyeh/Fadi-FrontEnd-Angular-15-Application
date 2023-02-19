import { Title } from '@angular/platform-browser';
import { RoutingAnimation } from './shared/animations/routing.animation';
import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RoutingAnimation]
})
export class AppComponent implements OnInit {
  title = 'FadiFrontEndAngularApplication';

  @HostBinding('class') className = '';

  constructor (private _title: Title, private _overlayContainer: OverlayContainer) {
    this._title.setTitle("Fadi Krdiyeh");
  }

  theme(themeMode: string) {
    this.className = themeMode;

    if (themeMode == 'darkMode') {
      this._overlayContainer.getContainerElement().classList.add(themeMode);
      localStorage.setItem('FadiApplicationTheme', 'dark');
    } else {
      this._overlayContainer.getContainerElement().classList.remove('darkMode');
      localStorage.setItem('FadiApplicationTheme', 'light');
    }
  }

  ngOnInit(): void {
    this.className = localStorage.getItem('FadiApplicationTheme') === 'dark' ? 'darkMode' : '';
  }
}
