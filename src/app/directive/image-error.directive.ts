import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { environment } from '../../environments/environment';

@Directive({
  selector: '[appErrorImg]'
})
export class ImageErrorDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('appErrorImg') errorImagSrc: string;
  constructor(public elementRef: ElementRef) { }

  @HostListener('error', ['$event.target'])
  ImageError(event) {
    if (this.errorImagSrc == 's_art_head') {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/skms2.png'
    }
    if (this.errorImagSrc == 's_user') {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/u.jpg'
    }
    else if (this.errorImagSrc == 's_parent') {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/touxiang.png'
    }
    else if (this.errorImagSrc == 's_teacher') {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/skms2.png'
      console.log(this.elementRef);
    }
    else if (!this.errorImagSrc) {
      event.src = this.elementRef.nativeElement.baseURI + '/assets/imgs/course.png'
    }


    // if (event.src == '' || event.src == null || event.src == undefined) {
    //   console.log('没有图片');
    // }
    // console.log(this.errorImagSrc);
    // event.src = environment.urlImgError + '/course.png'
    // console.log(event, this.errorImagSrc);
  }

}
