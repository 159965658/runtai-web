import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myAsync'
})
export class MyAsyncPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value,args);
    return args;
  }

}
