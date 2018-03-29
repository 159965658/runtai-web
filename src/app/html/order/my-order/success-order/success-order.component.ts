import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from '../../../../service/order/order.service';
import { GetCourseOrderList } from '../../../../interface/order/get-course-order-list';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit, AfterViewInit {

  constructor(private _orderService: OrderService) { }
  ngOnInit() {
    //this.GetOrderList();
  }
  GetOrderList() {
    let req = new GetCourseOrderList();
    req.pageIndex++;
    req.i_order_type = 2;
    this._orderService.SetSubjectOrderList(req);
  }
  ngAfterViewInit() {
    this.GetOrderList();
  }

}
