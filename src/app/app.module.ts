import { HttpBaseService } from './util/http-Base.service';
import { AppRoutingModel } from './AppRoutingModel';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { LoginComponent } from './html/login/login.component';
import { HomeComponent } from './html/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CourseComponent } from './html/course/course.component';
import { StudyComponent } from './html/study/study.component';
import { PersonalComponent } from './html/personal/personal.component';
import { MainComponent } from './html/main/main.component';
import { HeaderComponent } from './component/header/header.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HotCourseComponent } from './html/home/hot-course/hot-course.component';
import { RecommendCourseComponent } from './html/home/recommend-course/recommend-course.component';
import { TteacherComponent } from './html/home/tteacher/tteacher.component';
import { CourseService } from './service/course/course.service';
import { MyAsyncPipe } from './pipe/my-async.pipe';
import { MySaleFromPipe } from './pipe/my-sale-from.pipe';
import { ScrollService } from './util/mutual/scroll.service';
import { MutualComponent } from './html/home/mutual/mutual.component';
import { MyImgDefaultPipe } from './pipe/my-img-default.pipe';
// import { ImageErrorDirective } from './directive/image-error.directive';
import { CourseListComponent } from './component/course-list/course-list.component';
// import { LoadComponent } from './component/load/load.component';
import { CarouselService } from './service/carousel/carousel.service';
import { SearchComponent } from './html/search/search.component';
import { UtilMethodService } from './util/util-method.service';
import { CacheService } from './service/cache/cache.service';
import { MySortPipe } from './pipe/my-sort.pipe';
import { TeacherService } from './service/teacher/teacher.service';
import { TeacherListComponent } from './component/teacher-list/teacher-list.component';
import { CourseDetailsComponent } from './html/course-details/course-details.component';
// import { GoBackComponent } from './component/go-back/go-back.component';
import { MyTimestampPipe } from './pipe/my-timestamp.pipe';
// import { MyGradeSubPipe } from './pipe/my-grade-sub.pipe';
import { MySubjectTypePipe } from './pipe/my-subject-type.pipe';
import { IntroduceComponent } from './html/course-details/introduce/introduce.component';
import { ArrangeComponent } from './html/course-details/arrange/arrange.component';
import { DiscussionComponent } from './html/course-details/discussion/discussion.component';
import { EvaluateComponent } from './html/course-details/evaluate/evaluate.component';
import { CourseFooterComponent } from './html/course-details/course-footer/course-footer.component';
import { OrderComponent } from './html/order/order.component';
import { CanLoginActivate, CanIsLoginActivate, CanIsPassWordActivate, CheckSonListActivate, CanIsParentActivate } from './guard-auth/can-login-activate';
import { OrderFooterComponent } from './html/order/order-footer/order-footer.component';
import { OrderPayComponent } from './html/order/order-pay/order-pay.component';
import { OrderConfirmComponent } from './html/order/order-confirm/order-confirm.component';
import { OrderService } from './service/order/order.service';
import { MessageComponent } from './component/message/message.component';
import { MessageService } from './service/message.service';
import { MyOrderComponent } from './html/order/my-order/my-order.component';
import { AllOrderComponent } from './html/order/my-order/all-order/all-order.component';
import { StayOrderComponent } from './html/order/my-order/stay-order/stay-order.component';
import { SuccessOrderComponent } from './html/order/my-order/success-order/success-order.component';
import { OrderListComponent } from './html/order/my-order/order-list/order-list.component';
import { MyOrderStatePipe } from './pipe/my-order-state.pipe';
import { StudyHeaderComponent } from './html/study/study-header/study-header.component';
import { TestComponent } from './test/test/test.component';
import { MyCourseComponent } from './html/study/my-course/my-course.component';
import { MyTableComponent } from './html/study/my-table/my-table.component';
import { StudyService } from './service/study/study.service';
// import { StudyListComponent } from './html/study/study-list/study-list.component';
import { TodayPipe } from './pipe/today.pipe';
import { MessageDetailsComponent } from './html/message/message-details/message-details.component';
import { MessageComponenta } from './html/message/message.component';
import { MymessageComponent } from './html/message/mymessage/mymessage.component';
import { TeacherDetailsComponent } from './html/teacher-details/teacher-details.component';
import { NzScrollService } from 'ng-zorro-antd/src/core/scroll/nz-scroll.service';
import { DisListComponent } from './html/course-details/discussion/dis-list/dis-list.component';
import { AffixComponent } from './component/affix/affix.component';
import { AddinputComponent } from './component/addinput/addinput.component';
// import { LoadingComponent } from './component/loading/loading.component';
import { DisDetailsComponent } from './html/course-details/discussion/dis-details/dis-details.component';
// import { SwitchDatePipe } from './pipe/switch-date.pipe';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NoopInterceptor } from './service/owenInterceptor';
import { TeacherRecComponent } from './html/course-details/teacher-rec/teacher-rec.component';
import { PersonalDataComponent } from './html/personal-data/personal-data.component';
import { MessageHttpService } from './service/message/messageHttp.Service';
import { ChangePasswordComponent } from './html/change-password/change-password.component';
import { PayService } from './service/pay.service';
import { WxpayComponent } from './html/wxpay/wxpay.component';
import { ParentModule } from './parent/parent.module';
import { SharedModule } from './component/shared.module';
import { ChildService } from './service/child.service';
import { SharedPipeModule } from './pipe/sharedpipe.module';
import { ShortMessageService } from './service/short-message/short-message.service';
import { BindUserComponent } from './html/bind-user/bind-user.component';
import { RestPassWordComponent } from './html/rest-pass-word/rest-pass-word.component';
import { UpImgComponent } from './html/up-img/up-img.component';

const pipeList = [
  MyAsyncPipe,
  MyImgDefaultPipe,
  MySaleFromPipe
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    CourseComponent,
    StudyComponent,
    PersonalComponent,
    MainComponent,
    HeaderComponent,
    CarouselComponent,
    HotCourseComponent,
    RecommendCourseComponent,
    TteacherComponent,
    MutualComponent,
    pipeList,
    // ImageErrorDirective,
    CourseListComponent,
    // LoadComponent,
    SearchComponent,
    MySortPipe,
    TeacherListComponent,
    CourseDetailsComponent,
    // GoBackComponent,
    MyTimestampPipe,
    // MyGradeSubPipe,
    MySubjectTypePipe, 
    IntroduceComponent,
    ArrangeComponent,
    DiscussionComponent,
    EvaluateComponent,
    CourseFooterComponent,
    OrderComponent,
    OrderFooterComponent,
    OrderPayComponent,
    OrderConfirmComponent,
    MessageComponent,
    MyOrderComponent,
    AllOrderComponent,
    StayOrderComponent,
    SuccessOrderComponent,
    OrderListComponent,
    MyOrderStatePipe,
    StudyHeaderComponent,
    TestComponent,
    MyCourseComponent,
    MyTableComponent,
    // StudyListComponent,
    TodayPipe,
    MessageComponenta,
    MymessageComponent,
    MessageDetailsComponent,
    TeacherDetailsComponent,
    DisListComponent,
    AffixComponent,
    AddinputComponent,
    // LoadingComponent,
    DisDetailsComponent,
    // SwitchDatePipe,
    TeacherRecComponent,
    PersonalDataComponent, ChangePasswordComponent, WxpayComponent, BindUserComponent, RestPassWordComponent, UpImgComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SharedPipeModule,
    // ReactiveFormsModule,
    // FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModel,
    NgZorroAntdModule.forRoot(),
    // RouterModule.forRoot(AppRoutingModel)
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } }, MessageService, StudyService,
    OrderService, CourseService, HttpBaseService, ScrollService, CarouselService, UtilMethodService, CacheService, TeacherService,
    CanLoginActivate, CanIsLoginActivate, CanIsPassWordActivate, NzScrollService, MessageHttpService, PayService, { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }, ChildService, ShortMessageService, CheckSonListActivate, CanIsParentActivate],
  // exports: [
  //   MyGradeSubPipe,
  // ]
})
export class AppModule { }
