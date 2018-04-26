import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import * as weixin from "weixin-js-sdk";
import { HttpBaseService } from '../util/http-Base.service';
import { PayService } from './pay.service';
import { Urls } from './url';
import { UtilMethodService } from '../util/util-method.service';
import * as sha1 from 'js-sha1';
import { environment } from '../../environments/environment';
import { MessageService } from './message.service';
import { Subscription, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class StartRouterService {

  // router跳转动画所需参数
  routerState: boolean = true;
  routerStateCode: string = 'active';
  private subjectMessage = new Subject<any>();
  constructor(private router: Router, private http: HttpBaseService, private util: UtilMethodService, private message: MessageService) { }
  start() {
    // alert(this.android());
    this.androidfenx(); //课程分享
  }
  android() {
    var u = window.navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  }
  getsubFenx(): Observable<any> {
    return this.subjectMessage.asObservable();
  }
  androidfenx() {
    //if (!this.android()) return false;
    const url = window.location.href;
    let n = url.indexOf('courserId='); //是否是分享
    if (n > -1) {
      n = n + 10;
      var code = url.substr(n);
      window.location.href = '#/courseDetails/' + code + '/introduce';
      //  this.router.navigate(['/courseDetails/' + code + '/introduce']);
    }
  }
  weixinInit(model: any) { //课程分享
    // this.http.httpGet('', '');
    model.s_course_name = environment.fenxStr + model.s_course_name;
    this.http.httpPost(Urls.GetAcctonToken, {}).subscribe(res => { //获取微信token
      console.log(res);
      if (res.ticket) {
        const ranStr = this.util.getRandomString();
        const timeUnix = this.util.myTimeUnix() / 1000;
        let url: string = window.location.href;
        //let subStr: string = url.substr(0, url.indexOf('#'));
        let subStr: string = url.substr(0, url.indexOf('#') - 1);
        if (this.android()) {
          url = subStr + '?courserId=' + model.i_id;;
        }
        subStr += '/';
        const sha1: string = this.weixinSha1(res.ticket, ranStr, timeUnix, subStr);
        console.log(ranStr, timeUnix, sha1);
        weixin.config({
          debug: !environment.production, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: environment.appid, // 必填，公众号的唯一标识
          timestamp: timeUnix, // 必填，生成签名的时间戳
          nonceStr: ranStr, // 必填，生成签名的随机串
          signature: sha1,// 必填，签名
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        });
        this.reader(url, model);
      }
    })
    console.log(weixin);
  }
  reader(url, model) {
    const th = this;
    weixin.ready(function () {
      console.log('reader');
      weixin.onMenuShareAppMessage({
        title: model.s_course_name, // 分享标题
        desc: model.s_course_explain, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: environment.pathImg + model.s_course_img, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          //  alert('分享成功')
          //  th.message.setMessage({ error: 'success', message: '分享成功' });
          th.subjectMessage.next(true);
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          // alert('分享失败')
          th.subjectMessage.next(false);
        }
      });
      th.onMenuShareTimeline(url, model);
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    weixin.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log('error', res);
    });

  }
  onMenuShareTimeline(url, model) {
    const th = this;
    weixin.onMenuShareTimeline({
      title: model.s_course_name, // 分享标题
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: environment.pathImg + model.s_course_img, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        th.subjectMessage.next(true);
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        th.subjectMessage.next(false);
      }
    });
  }
  weixinSha1(jsapi_ticket: string, noncestr: string, timeUnix: number, url: string): string {
    const str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timeUnix + '&url=' + url;
    console.log(str);
    const sha1Str = sha1(str);
    return sha1Str;
  }

}
