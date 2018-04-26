import { Injectable } from '@angular/core';
import { WxPayModel } from '../interface/pay/wxPayModel';
import { HttpBaseService } from '../util/http-Base.service';
import { Urls } from './url';
import { Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PayService {

  constructor(private http: HttpClient, private httpPost: HttpBaseService) { }
  WxPay(code: string, id: number) {
    console.log(code);
    return this.http.get(Urls.WxPay + "?code=" + code + '&order_id=' + id);
  }
  hrefCode(id) {
    const url2 = encodeURIComponent(environment.wxUri + '/?#/pay?id=' + id);
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + environment.appid + '&redirect_uri=' + url2 + '&response_type=code&scope=snsapi_base&state=a#wechat_redirect';
  }
  GetWeixinLogin(code) {
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // this.http.post("", {}, { headers })
    return this.httpPost.httpPostf(Urls.GetWeixinLogin + '?code=' + code, {});
  }
  GetWeixinBind(openid, loginName, password) {
    return this.httpPost.httpPostf(Urls.GetWeixinBind + '?openid=' + openid + '&loginName=' + loginName + '&password=' + password, {});
  }
  //分享
  GetAcctonToken() {
    return this.http.post(Urls.GetAcctonToken, {});
  }
}
