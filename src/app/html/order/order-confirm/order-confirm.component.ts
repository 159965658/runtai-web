import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver
} from "@angular/core";
import { CacheUserModel } from "../../../interface/cache/cacheUserModel";
import { CourseService } from "../../../service/course/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CacheService } from "../../../service/cache/cache.service";
import { CourseDetailsModel } from "../../../interface/courseModel";
import { CacheEnum } from "../../../enum/cacheEnum";
import { OnDestroy, AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subscription } from "rxjs";
import { OrderService } from "../../../service/order/order.service";
import { IndexHuiKuan } from "../../../interface/order/index-hui-kuan";
import { NzMessageService } from "ng-zorro-antd";
import { MessageComponent } from "../../../component/message/message.component";
import { UtilMethodService } from "../../../util/util-method.service";
import { MessageService } from "../../../service/message.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PhoneValidator } from "../../../Validator/phone-validator";
@Component({
  selector: "app-order-confirm",
  templateUrl: "./order-confirm.component.html",
  entryComponents: [MessageComponent],
  styleUrls: ["./order-confirm.component.css"]
})
export class OrderConfirmComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }
  @ViewChild('searchInput') searchInput;
  //inputModel: any;
  course = [];
  courseId: any;
  subscribeObject: Subscription;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private orderService: OrderService,
    private courseService: CourseService,
    private activaRouter: ActivatedRoute,
    private cacheService: CacheService
  ) { }
  cacheUserModel = new CacheUserModel();
  invPhone: FormGroup;
  inputModel = {
    price: 0,
    butTxt: "提交订单",
    title: "确认订单"
  };
  ngOnInit() {
    //监控路由出口发出来的数据
    this.subscribeObject = this.courseService
      .getOrderConfirm()
      .subscribe(res => {
        if (res == 1) {
          this.orderConfirm();
        }
      });

    this.activaRouter.queryParams.subscribe(
      params => (this.courseId = params.id)
    );
    let req = new CourseDetailsModel();
    req.i_course_id = this.courseId;
    this.courseService.GetCourseDetails(req).subscribe(res => {
      this.course.push(res);
      this.course[0].i_grade = res.s_grade;
      this.course[0].i_course_id = res.i_id;
      this.inputModel.price = res.i_present_price;
      this.courseService.setDetails(this.inputModel); //发送数据
    });
    let jsonModel = this.cacheService.getUserModel();
    this.cacheUserModel = jsonModel;
    this.invPhone = this.fb.group({
      phone: [
        this.cacheUserModel.i_invoice_phone,
        [Validators.required, PhoneValidator]
      ]
    });
  }
  orderConfirm() {
    // let userModel = this.cacheService.getUserModel();
    // let cacheUserModel = this.cacheUserModel;
    // cacheUserModel = userModel;
    let req = new IndexHuiKuan();
    req.i_users_id = this.cacheUserModel.UserId;
  
    if (!this.invPhone.valid) {
      this._messageService.setMessage({
        error: "error",
        message: this.invPhone.controls.phone.errors.msg.info
      });
      return;
    }
    req.i_invoice_phone = this.invPhone.get("phone").value;
    req.i_course_id = this.course[0].i_course_id;
    this.orderService.IndexHuiKuan(req).subscribe(res => {
      if (res.StatusCode == undefined) {
        if (this.inputModel.price == 0) {
          this._router.navigate(["/main/study/my-course"]);
          return;
        }
        location.href = "/#/order/pay?orderId=" + res.i_id;
        return;
      }
    });
  }
  ngOnDestroy() {
    this.subscribeObject.unsubscribe();
  }
}
