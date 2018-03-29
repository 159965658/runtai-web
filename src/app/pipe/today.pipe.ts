import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
@Pipe({
  name: 'today'
})
export class TodayPipe implements PipeTransform {

  transform(value: any): any {

    let nowDate = moment(); //当前时间
    // let oldnow = moment(value).subtract(60 * 15, 'seconds'); //当前时间的前15分钟
    // console.log(oldnow.format("YYYY/MM/DD HH:mm")); //2017/11/15 07:08
    let defaultData = moment(value); //value  开课时间 
    //判断是否是今天
    if (nowDate.isSame(defaultData,'day')) {
      value = '今天'
    }
    return value;
  }

}
