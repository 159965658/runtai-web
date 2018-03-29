import { Injectable } from '@angular/core';
import { HttpBaseService } from '../../util/http-Base.service';
import { Urls } from '../url';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShortMessageService {

  constructor(private http: HttpBaseService, private httpClient: HttpClient) { }
  SendShort(phone: string) {
    return this.http.httpPost(Urls.Send, { phone: phone });
    //  return this.httpClient.get();
    //return this.http.httpPost(Urls.Send, { phone: phone, content: content });
  }
  RecoverPassword(accout: string, password: string, phone: string) { //忘记密码
    return this.http.httpPost(Urls.RecoverPassword, { s_login_account: accout, s_paddword: password, phone: phone });
  }
  // GetSubjectList() { //获取学科列表
  //   return this.http.httpPost(Urls.GetSubjectList, {});
  // }
}
