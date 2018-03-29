import { Pipe, PipeTransform } from '@angular/core';
import { SaleEnum } from '../enum/saleEnum';

@Pipe({
  name: 'myGradeSub'
})
export class MyGradeSubPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) return; 
    if (typeof value === 'number') {
      return SaleEnum['Sale' + value];
    }
    if (value.substring(value.length - 1) == ',') {
      value = value.substring(0, value.length - 1);
      let arr = value.split(',');
      value = arr[arr.length - 1];
    }
    value = SaleEnum['Sale' + value];
    return value;
  }

}
