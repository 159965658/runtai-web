import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderService } from '../../../../service/order/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as WeiXin from 'weixin-js-sdk';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../service/message.service';
import { PayService } from '../../../../service/pay.service';
import { WxPayModel } from '../../../../interface/pay/wxPayModel';
import { environment } from '../../../../../environments/environment';
import { CourseService } from '../../../../service/course/course.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  courseList = [];
  getListFlag = false;
  WeixinJSBridge: WeiXin.WeixinJSBridge;
  constructor(private _orderService: OrderService,
    private http: HttpClient,
    private router: ActivatedRoute, private message: MessageService, private payService: PayService, private _courseService: CourseService,
    private router2: Router) { }
  private subjectTion: Subscription;
  private subjectScroll: Subscription;
  url = environment.pathImg;
  ngOnInit() {
    this.router.params.subscribe(res => {
      console.log(res);
    })
    this.init(); 
    console.log(WeiXin, window['WeixinJSBridge']);
 

  }

  init() {
    //开始观察对象
    this.subjectTion = this._orderService.GetSubjectOrderList().subscribe((res) => {
      setTimeout(() => {
        this._orderService.GetCourseOrderList(res).subscribe(r => {
          console.log(r);
          this.courseList = r;
        });
        this.getListFlag = true;
      }, 300);
    });
  }
  //微信支付
  pay(id) {
    //  this._courseService.content.Id = id;
    this.payService.hrefCode(id);
  }
  cancelPay(id) {
    this._orderService.CancelHuikuan(id).subscribe(res => {
      //this.init();
      if (res == true || res == 'true') {
        console.log(res);
        //  this.courseList = this._orderService.GetCourseOrderList(res);
        this.courseList.find(p => p.i_id == id).i_order_state = 3;
      }
    });
  }
  ngOnDestroy() {
    //销毁观察对象
    this.subjectTion.unsubscribe();
    //this.subjectScroll.unsubscribe();
  }

}
