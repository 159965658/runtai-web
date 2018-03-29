import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'myImgDefault'
})
export class MyImgDefaultPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: any): any {
    console.log(value);
    return (value === "" || value === null) ? args : environment.pathImg + value;
  }

}
