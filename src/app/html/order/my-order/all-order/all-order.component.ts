import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from '../../../../service/order/order.service';
import { GetCourseOrderList } from '../../../../interface/order/get-course-order-list';
import { CacheService } from '../../../../service/cache/cache.service';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit, AfterViewInit {

  constructor(private _orderService: OrderService) { }
  ngOnInit() {
    //this.GetOrderList();
  }
  GetOrderList() {
    let req = new GetCourseOrderList();
    req.pageIndex++;
    this._orderService.SetSubjectOrderList(req);
  }
  ngAfterViewInit() {
    this.GetOrderList();
  }


}
