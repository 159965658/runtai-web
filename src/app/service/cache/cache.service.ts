import { Injectable } from '@angular/core';
import { UtilMethodService } from '../../util/util-method.service';
import { CacheEnum } from '../../enum/cacheEnum';
import { CacheUserModel } from '../../interface/cache/cacheUserModel';

@Injectable()
export class CacheService {

  constructor(private util: UtilMethodService) { }
  setLocalCache(key, value) { // 永久存储
    value = this.util.objectString(value);
    localStorage.setItem(key, value);
  }
  setSessionCache(key, value) { //会话结束消失
    value = this.util.objectString(value);
    sessionStorage.setItem(key, value);
  }
  getSessionSubjectCache() { //获取学科数据
    let value = this.getSessionCache(CacheEnum.subject);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  getSessionCache(key): any {
    return sessionStorage.getItem(key);
  }
  getLocalCache(key): any {
    return localStorage.getItem(key);
  }
  getUserModel(): CacheUserModel {
    let user = this.getLocalCache(CacheEnum.loginKey);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  removeLocalCache(key) {
    localStorage.removeItem(key);
  }
  removeSessionCache(key) {
    sessionStorage.removeItem(key);
  }
  removeUserModel() { //退出登录
    localStorage.removeItem(CacheEnum.loginKey); //清空用户信息
    sessionStorage.removeItem(CacheEnum.childList);//删除孩子信息
  }
}
