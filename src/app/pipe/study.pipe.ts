import { Pipe, PipeTransform } from '@angular/core';
import { StudySectionEnum } from '../enum/studySectionEnum';

@Pipe({
  name: 'study'
})
export class StudyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) return;
  
    // if (typeof value === 'number') {
    //   return StudySectionEnum['Sale' + value];
    // }
    // if (value.substring(value.length - 1) == ',') {
    //   value = value.substring(0, value.length - 1);
    //   let arr = value.split(',');
    //   value = arr[arr.length - 1];
    // }
    value = StudySectionEnum['StudySection' + value];
    return value;
  }

}
