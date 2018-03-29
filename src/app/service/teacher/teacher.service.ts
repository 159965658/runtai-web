import { Injectable } from '@angular/core';
import { GetIndexTeacher } from '../../interface/teacher/GetIndexTeacher';
import { Urls } from '../url';
import { HttpBaseService } from '../../util/http-Base.service';
import { GetTeacherDetails, GetTeacherCourse } from '../../interface/teacher/GetTeacherDetails';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class TeacherService {

  constructor(private httpServe: HttpBaseService, private cache: CacheService) { }
  GetIndexTeacher(req: GetIndexTeacher) { //获取教师列表
    return this.httpServe
      .httpPost(Urls.GetIndexTeacher, req);
  }
  GetTeacherDetails(id: number) { //获取教师详情
    let req = new GetTeacherDetails();
    req.teacher_id = id;
    return this.httpServe.httpPost(Urls.GetTeacherDetails, req);
  }
  GetTeacherCourse(id: number, pageIndex: number) {
    let req = new GetTeacherCourse();
    req.teacher_id = id;
    return this.httpServe.httpPost(Urls.GetTeacherCourse, req);
  }
  UserPhoneUntie(phone: string) { //更改手机号
    let user = this.cache.getUserModel();
    //req.teacher_id = cache;
    return this.httpServe.httpPost(Urls.UserPhoneUntie, { i_users_id: user.UserId, phone: phone });
  }
}
