import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fadi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDark: boolean = localStorage.getItem('FadiApplicationTheme') == 'dark' ? true : false;
  toggleControl = new FormControl(this.isDark);

  isOffline: boolean = false;
  @HostListener('window:offline', ['$event']) isWindowOffline (event:any) {
    console.log('Offline? ', event);
    this.isOffline = true;
  }

  @Output() themeEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.themeEvent.emit(darkMode ? darkClassName : '');
      console.log(darkMode, ' ', this.toggleControl.value);
    });
  }
}
