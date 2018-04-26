import { Component, OnInit, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './service/message.service';
import { StaticModel } from './interface/staticModel';
import { CacheService } from './service/cache/cache.service';
import { CacheEnum } from './enum/cacheEnum';
import { SubjectEnum } from './enum/subjectEnum';
import { HttpBaseService } from './util/http-Base.service';
import { Urls } from './service/url';
import { CourseService } from './service/course/course.service';
import { sideIndex } from 'dhz-sideutil';
import { environment } from '../environments/environment';
import { StartRouterService } from './service/start-router.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '京课';
  constructor(private cahce: CacheService, private course: CourseService, private start: StartRouterService, private router: Router) {
    this.course.getSubjectCache().subscribe(subject => { });
  }
  ngOnInit(): void {
    this.router.events.filter((event) => event instanceof NavigationEnd)
      .subscribe(res => {
        window.scrollTo(0, 0);
      });
    // console.log(sideIndex(1));
    var url = window.location.href;
    var n = url.indexOf('code=');
    if (n > -1) {
      n = n + 5;
      var code = url.substr(n);
      var arr = code.split('&');
      this.cahce.setSessionCache(CacheEnum.weChat, arr[0]);
    }
    this.start.start();
    //this.wej();
  }

  wej() {
    //   console.log(weixin);
    // jweixin.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: environment.appid, // 必填，公众号的唯一标识
    //   timestamp: this.Mytime(),  // 必填，生成签名的时间戳
    //   nonceStr: this.getRandomString(16), // 必填，生成签名的随机串
    //   signature: '', // 必填，签名
    //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表
    // });


    // jweixin.ready()({
    //   jweixin.onMenuShareTimeline({
    //     title: '',  // 分享标题
    //     link: '', // 分享链接,将当前登录用户转为puid,以便于发展下线
    //     imgUrl: '', // 分享图标
    //     success: function () {
    //       // 用户确认分享后执行的回调函数
    //       alert('分享成功');
    //     },
    //     cancel: function () {
    //       // 用户取消分享后执行的回调函数
    //     }
    //   });
    // });
  }

}
