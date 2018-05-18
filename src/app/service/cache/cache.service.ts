import { Injectable } from '@angular/core';
import { UtilMethodService } from '../../util/util-method.service';
import { CacheEnum } from '../../enum/cacheEnum';
import { CacheUserModel } from '../../interface/cache/cacheUserModel';
import WebStorageCache from 'web-storage-cache';
@Injectable()
export class CacheService {
  wsCache = new WebStorageCache();
  constructor(private util: UtilMethodService) { }
  setLocalCache(key, value) { // 永久存储 
    if (key == CacheEnum.loginKey) {
      // 超时截止日期，可用使用Date类型 
      this.setUserModel(value);
      return;
    }
    value = this.util.objectString(value);
    localStorage.setItem(key, value);
  }
  private setUserModel(value) {
    //this.wsCache.set(CacheEnum.loginKey, value, { exp: 86400 * 9 });
    this.wsCache.set(CacheEnum.loginKey, value, { exp: 86400 * 9 });
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
    let user = this.wsCache.get(CacheEnum.loginKey);
    if (user) {
      return user;
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
    this.wsCache.delete('username');
    localStorage.removeItem(CacheEnum.loginKey); //清空用户信息
    sessionStorage.removeItem(CacheEnum.childList);//删除孩子信息
  }
}
