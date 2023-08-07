import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[apptableResponsive]'
})
export class TableResponsiveDirective implements OnInit {

  private _marginTable: number;
  private _changeIn: number;
  private _changeInParent: number;

  constructor(private _el: ElementRef, private _render: Renderer2) { }

  @HostListener('window:resize')
  private _resize() {
    const margin: number = (this._el.nativeElement.offsetParent.offsetWidth - this._el.nativeElement.offsetWidth);

    if (this._el.nativeElement.offsetParent.offsetWidth < this._el.nativeElement.offsetWidth && !this._changeIn) {
      this._changeIn = this._el.nativeElement.offsetWidth;
      this._render.addClass(this._el.nativeElement, 'responsive');
    }

    if ((this._marginTable - 2) > margin && !this._changeIn) {
      this._render.addClass(this._el.nativeElement, 'responsive');
      this._changeIn = this._el.nativeElement.offsetWidth;
      this._changeInParent = this._el.nativeElement.offsetParent.offsetWidth;
    }

    if (this._el.nativeElement.offsetWidth < (this._changeIn + 15)) {
      this._render.addClass(this._el.nativeElement, 'responsive');
    }

    if (this._el.nativeElement.offsetWidth > this._changeIn) {
      this._render.removeClass(this._el.nativeElement, 'responsive');
    }
  }

  ngOnInit() {
    setTimeout(()=> {
      if (this._el.nativeElement.offsetParent.offsetWidth < this._el.nativeElement.offsetWidth) {
        this._changeIn = this._el.nativeElement.offsetWidth;
        this._render.addClass(this._el.nativeElement, 'responsive');
      }
    }, 950)
  }

}
