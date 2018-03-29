import { Pipe, PipeTransform } from '@angular/core';
import { UtilMethodService } from '../util/util-method.service';

@Pipe({
  name: 'myTimestamp'
})
export class MyTimestampPipe implements PipeTransform {
  constructor(private util: UtilMethodService) {

  }
  transform(value: any, args?: any, hoursFlag: boolean = false, secondFlag = false): any {
    if(!value) return;
    let val = this.util.timesTamp(value, args, hoursFlag, secondFlag);
    return val;
  }

}
