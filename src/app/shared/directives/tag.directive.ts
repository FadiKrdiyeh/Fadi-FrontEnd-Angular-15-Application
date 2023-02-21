import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fadiTag]'
})
export class TagDirective implements AfterViewInit {
  @Input('fadiTag') bgColor: string = '';
  @Input() fgColor: string = '#fff';

  constructor (private _elementRef: ElementRef, private _rendere2: Renderer2) {
    _rendere2.setStyle(_elementRef.nativeElement, 'padding', '5px 10px');
    _rendere2.setStyle(_elementRef.nativeElement, 'fontSize', '18px');
    _rendere2.setStyle(_elementRef.nativeElement, 'borderRadius', '25px');
    _rendere2.setStyle(_elementRef.nativeElement, 'display', 'inline-flex');
    _rendere2.setStyle(_elementRef.nativeElement, 'justifyContent', 'center');
    _rendere2.setStyle(_elementRef.nativeElement, 'alignItems', 'center');
    // --------------------------------------------
    _rendere2.setStyle(_elementRef.nativeElement, 'backgroundColor', this.bgColor || 'aqua');
  }

  ngAfterViewInit(): void {
    this._rendere2.setStyle(this._elementRef.nativeElement, 'backgroundColor', this.bgColor || 'aqua');
    this._rendere2.setStyle(this._elementRef.nativeElement, 'color', this.fgColor);
  }
}
