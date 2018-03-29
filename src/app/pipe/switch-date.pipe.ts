import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { UtilMethodService } from '../util/util-method.service';
@Pipe({
  name: 'switchDate'
})
export class SwitchDatePipe implements PipeTransform {
  constructor(private util: UtilMethodService) { }
  transform(value: any, args?: any): any {
    let nowDate = moment(); //当前时间
    let unixTimestamp = new Date(args * 1000);
    let startDate = moment(unixTimestamp); //开课时间

    let oldnow = moment(startDate).subtract(60 * 15, 'seconds'); //开课时间的前15分钟
    let endDate = moment(value); //value  结课时间  
    if (nowDate.isAfter(endDate) && !nowDate.isBetween(oldnow, endDate)) { //截止时间 在 现在时间之后，课程已经结束
      value = '2';
    }
    else if (oldnow.isBefore(startDate)  && !nowDate.isBetween(oldnow, endDate) ) { //开课时间 在 当前 减去 15分钟之后的时候 说明课程还没有开始
      value = '1';
    }
    else if (nowDate.isBetween(oldnow, endDate)) {// 开始前15分钟 到 结课时间 可以进入课堂
      value = '3';
    }
    return value;
  }

}
