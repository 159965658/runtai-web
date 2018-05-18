import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order/order.service';
import { GetCourseOrder } from '../../../interface/order/get-course-order';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../service/course/course.service';
import { MessageService } from '../../../service/message.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { PayService } from '../../../service/pay.service';

@Component({
  selector: 'app-order-pay',
  templateUrl: './order-pay.component.html',
  styleUrls: ['./order-pay.component.css']
})
export class OrderPayComponent implements OnInit, OnDestroy {

  constructor(private _messageService: MessageService,
    private _orderService: OrderService, private activaRouter: ActivatedRoute, private _courseService: CourseService, private router: Router, private payService: PayService) { }
  inputModel = {
    price: 0,
    butTxt: '支付订单',
    title: '支付订单'
  }
  orderId: number;
  orderModel: any;
  subscribeObject: Subscription;
  ngOnInit() {
    this.activaRouter.queryParams.subscribe(params => this.orderId = params.orderId);
   
    this.GetCourseOrder();
    //监控路由出口发出来的数据
    this.subscribeObject = this._courseService.getOrderConfirm().subscribe(res => {
      if (res == 2) {
        //  this._courseService.content.Id = this.orderId;
        this.payService.hrefCode(this.orderId); // 支付订单
        //this.router.navigate(['/myorder']);
      }
      //this.orderConfirm();
    });
  }
  GetCourseOrder() {
    let req = new GetCourseOrder();
    req.i_id = this.orderId;
    this._orderService.GetCourseOrder(req).subscribe(res => {
      this.orderModel = res;
      this.inputModel.price = res.i_course_price;
      this._courseService.setDetails(this.inputModel);//发送数据
    })
  }
  ngOnDestroy() {
    this.subscribeObject.unsubscribe();
  }

}
