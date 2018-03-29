import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from '../../../../service/order/order.service';
import { GetCourseOrderList } from '../../../../interface/order/get-course-order-list';

@Component({
  selector: 'app-stay-order',
  templateUrl: './stay-order.component.html',
  styleUrls: ['./stay-order.component.css']
})
export class StayOrderComponent implements OnInit, AfterViewInit {

  constructor(private _orderService: OrderService) { }
  ngOnInit() {
    //this.GetOrderList();
  }
  GetOrderList() {
    let req = new GetCourseOrderList();
    req.pageIndex++;
    req.i_order_type = 1;
    this._orderService.SetSubjectOrderList(req);
  }
  ngAfterViewInit() {
    this.GetOrderList();
  }
}
