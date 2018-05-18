import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../service/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseModel, CourseDetailsModel } from '../../interface/courseModel';
import { CacheService } from '../../service/cache/cache.service';
import { CacheEnum } from '../../enum/cacheEnum';
import { CacheUserModel } from '../../interface/cache/cacheUserModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  titleDetails = '确认订单';
  headerStyle = 2;
  inputModel = {
    butTxt: '',
    price:'',
    title:''
  }
  subscribObject: Subscription;
  //cacheUserModel = new CacheUserModel();
  constructor(private courseService: CourseService, private activaRouter: ActivatedRoute, private cacheService: CacheService) {

  }

  ngOnInit() {
    //监控路由出口发出来的数据
    this.subscribObject = this.courseService.getDetails().subscribe(res => {
     
      this.inputModel = res;
    });
  }
  orderConfirm() {
   
    if (this.inputModel.butTxt == '提交订单')
      this.courseService.setOrderConfirm(1);
    if(this.inputModel.butTxt == '支付订单')
      this.courseService.setOrderConfirm(2);
  }
  //销毁页面
  ngOnDestroy() {
    this.subscribObject.unsubscribe();
  }

}
