import { Injectable } from '@angular/core';

@Injectable()
export class IsUserTypeService {

  constructor() { }
  init(userModel, path) { //判断是否允许家长访问该页面
    if (userModel.i_role_permission == 2 && path.indexOf('p-home') > -1) {
      return true;
    }
    return false;
  }
}
