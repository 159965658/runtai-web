import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appD]'
})
export class DDirective {
  @Input('appErrorImg') errorImagSrc: string;
  constructor(public elementRef: ElementRef) { }

  @HostListener('error', ['$event.target'])
  ImageError(event) { 
    if (this.errorImagSrc == 's_art_head') {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/skms2.png'
    }
    else if (this.errorImagSrc == 's_user') {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/u.jpg'
    }
    else if (!this.errorImagSrc) {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/course.png'
    }

  }
}