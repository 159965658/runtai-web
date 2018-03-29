import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mySaleFrom'
})
export class MySaleFromPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 1:
        value = '单程课'
        break;
      case 2:
        value = '组合课'
        break;
      case 3:
        value = '免费课'
        break;
      default:
        value = '其它课'
        break;
    };
    return value;
  }

}
