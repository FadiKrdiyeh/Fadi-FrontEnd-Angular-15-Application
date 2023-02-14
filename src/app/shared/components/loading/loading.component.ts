import { LoadingAnimation } from './../../animations/loading.animation';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'fadi-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [LoadingAnimation]
})
export class LoadingComponent implements OnInit {
  showLoading: boolean;

  constructor (private _loadingService: LoadingService, private _changeDetectorRef: ChangeDetectorRef) {
    this.showLoading = false;
  }

  ngOnInit(): void {
    this.init();
  }

  init () {
    this._loadingService.getLoadingObserver().subscribe((status) => {
      this.showLoading = status === 'start';
      this._changeDetectorRef.detectChanges();
    });
  }
}
