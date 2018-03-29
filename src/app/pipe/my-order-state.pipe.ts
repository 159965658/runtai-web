import { Pipe, PipeTransform } from '@angular/core';
import { OrderStateEnum } from '../enum/orderStateEnum';

@Pipe({
  name: 'myOrderState'
})
export class MyOrderStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return OrderStateEnum['State'+value];
   // return null;
  }

}
