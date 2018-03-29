import { Pipe, PipeTransform } from '@angular/core';
import { SubjectEnum } from '../enum/subjectEnum';
import { CacheService } from '../service/cache/cache.service';
import { CourseService } from '../service/course/course.service';
import { CacheEnum } from '../enum/cacheEnum';

@Pipe({
  name: 'mySubjectType',
  pure: false
})
export class MySubjectTypePipe implements PipeTransform {
  private cachedData: any = null;
  private value = '';
  constructor(private cache: CacheService, private course: CourseService) { }
  transform(value: any, args?: any): any {
    if (!value) return;
    this.cachedData = this.cache.getSessionCache(CacheEnum.subject);
    this.cachedData = JSON.parse(this.cachedData);
    if (this.cachedData) {
      value = this.cachedData.find(p => p.i_id == value).s_name;
    }
    return value; 
  }

}

// @Pipe({
//   name: 'mySubjectType1',

// })
// export class MySubjectTypePipe1 implements PipeTransform {
//   constructor(private cache: CacheService, private course: CourseService) { }
//   transform(value: any, args?: any): any {
//     // console.log(value); 
//     // if (!value) return;
//     // let subject = this.cache.getSessionCache(CacheEnum.subject);
//     // value = JSON.parse(subject).find(p => p.i_id == value).s_name;
//     // return value;

//   }

// }