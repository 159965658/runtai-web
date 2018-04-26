import { Component, OnInit } from '@angular/core';
import { StaticModel } from '../../interface/staticModel';
import { CacheService } from '../../service/cache/cache.service';
import { CacheEnum } from '../../enum/cacheEnum';
import { PayService } from '../../service/pay.service';
import { WxPayModel } from '../../interface/pay/wxPayModel';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../service/course/course.service';

@Component({
  selector: 'app-wxpay',
  templateUrl: './wxpay.component.html',
  styleUrls: ['./wxpay.component.css']
})
export class WxpayComponent implements OnInit {
  res;
  resJson: string;
  constructor(private cache: CacheService, private pay: PayService, private router: Router, private confirmServ: NzModalService, private routerIonfo: ActivatedRoute, private course: CourseService) { }

  ngOnInit() {
    let cache = this.cache.getSessionCache(CacheEnum.weChat);
    if (cache) {
      let id = 0;
      this.routerIonfo.queryParams.subscribe(res => {
        id = res.id;
        this.cache.removeSessionCache(CacheEnum.weChat);
        let req = new WxPayModel();
        this.pay.WxPay(cache, id).subscribe(res => {
          this.res = res;
          this.resJson = JSON.stringify(res);
          if (typeof window['WeixinJSBridge'] == "undefined") { this.onPay(); }
          else
            this.onBridgeReady(this.res);
        }, error => {
          alert(error);
          this.router.navigate(['/myorder']);
        });
      })
      //   alert(id+","+cache);
      // setTimeout(() => {
      //   this.showConfirm();
      // }, 300); 
    }
    else {
      this.router.navigate(['/main/study/my-course']);
    }
  }
  onBridgeReady(res) {
    let th = this;
    try {
      window['WeixinJSBridge'].invoke(
        'getBrandWCPayRequest', {
          "appId": res['appId'],     //公众号名称，由商户传入     
          "timeStamp": res['timeStamp'],         //时间戳，自1970年以来的秒数     
          "nonceStr": res['nonceStr'], //随机串     
          "package": res['package'],
          "signType": res['signType'],         //微信签名方式：     
          "paySign": res['paySign'] //微信签名 
        },
        function (r) {
          // alert('支付回调' + r);
          // alert(r.err_msg);
          // alert(JSON.stringify(r));
          // console.log(res);
          // if (r.err_msg == "get_brand_wcpay_request:ok") {//支付成功

          // }
          // else {
          //  window.location.href = '' //支付失败
          // }   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          th.routerHref();
        }
      );
    } catch (error) {
      alert('错误' + error);
    }

  }
  routerHref() {
    window.location.href = '/#/main/study/my-course';
  }
  onPay() {
    var th = this;
    if (typeof window['WeixinJSBridge'] == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', function () {
          th.onBridgeReady(th.res);
        }, false);
      } else if (document['attachEvent']) {
        document['attachEvent']('WeixinJSBridgeReady', this.onBridgeReady(this.res));
        document['attachEvent']('onWeixinJSBridgeReady', this.onBridgeReady(this.res));
      }
    } else {
      this.onBridgeReady(this.res);
    }
  }
}
