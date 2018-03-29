import { Pipe, PipeTransform } from '@angular/core';
import { UtilMethodService } from '../util/util-method.service';

@Pipe({
  name: 'mySort'
})
export class MySortPipe implements PipeTransform {
  constructor(private util: UtilMethodService) { }
  transform(value: any, orderid: any, desc?: any): any {
    value.sort((a, b) => { return this.util.orderBy(a, b, orderid, desc) });
    return value;
  }

}
