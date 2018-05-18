import { RecommendCourseComponent } from './html/home/recommend-course/recommend-course.component';
import { HotCourseComponent } from './html/home/hot-course/hot-course.component';
import { PersonalComponent } from './html/personal/personal.component';
import { CourseComponent } from './html/course/course.component';
import { LoginComponent } from './html/login/login.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './html/home/home.component';
import { StudyComponent } from './html/study/study.component';
import { MainComponent } from './html/main/main.component';
import { TteacherComponent } from './html/home/tteacher/tteacher.component';
import { SearchComponent } from './html/search/search.component';
import { CourseDetailsComponent } from './html/course-details/course-details.component';
import { IntroduceComponent } from './html/course-details/introduce/introduce.component';
import { DiscussionComponent } from './html/course-details/discussion/discussion.component';
import { ArrangeComponent } from './html/course-details/arrange/arrange.component';
import { EvaluateComponent } from './html/course-details/evaluate/evaluate.component';
import { OrderComponent } from './html/order/order.component';
import { CanLoginActivate, CanIsLoginActivate, CanIsPassWordActivate, CheckSonListActivate, CanIsParentActivate } from './guard-auth/can-login-activate';
import { OrderConfirmComponent } from './html/order/order-confirm/order-confirm.component';
import { OrderPayComponent } from './html/order/order-pay/order-pay.component';
import { MyOrderComponent } from './html/order/my-order/my-order.component';
import { AllOrderComponent } from './html/order/my-order/all-order/all-order.component';
import { StayOrderComponent } from './html/order/my-order/stay-order/stay-order.component';
import { SuccessOrderComponent } from './html/order/my-order/success-order/success-order.component';
import { TestComponent } from './test/test/test.component';
import { MyTableComponent } from './html/study/my-table/my-table.component';
import { MyCourseComponent } from './html/study/my-course/my-course.component';
import { MessageComponenta } from './html/message/message.component';
import { MymessageComponent } from './html/message/mymessage/mymessage.component';
import { MessageDetailsComponent } from './html/message/message-details/message-details.component';
import { TeacherDetailsComponent } from './html/teacher-details/teacher-details.component';
import { DisDetailsComponent } from './html/course-details/discussion/dis-details/dis-details.component';
import { TeacherRecComponent } from './html/course-details/teacher-rec/teacher-rec.component';
import { PersonalDataComponent } from './html/personal-data/personal-data.component';
import { ChangePasswordComponent } from './html/change-password/change-password.component';
import { WxpayComponent } from './html/wxpay/wxpay.component';
import { BindUserComponent } from './html/bind-user/bind-user.component';
import { RestPassWordComponent } from './html/rest-pass-word/rest-pass-word.component';
import { UpImgComponent } from './html/up-img/up-img.component';
const appMyChildMessage: Routes = [
  { path: '', redirectTo: 'mymes', pathMatch: 'full' },
  { path: 'mymes', component: MymessageComponent },//我的消息
  { path: 'mes-details', component: MessageDetailsComponent }//消息详情
]
const appMyStudyChild: Routes = [
  { path: '', redirectTo: 'my-course', pathMatch: 'full' },
  { path: 'table', component: MyTableComponent }, //我的课表
  { path: 'my-course', component: MyCourseComponent },//我的课程 
]
const appMyOrderChild: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: AllOrderComponent }, //全部订单
  { path: 'stay', component: StayOrderComponent },//待支付订单
  { path: 'success', component: SuccessOrderComponent } // 已完成
]
//订单
const appOrderChild: Routes = [
  { path: '', redirectTo: 'confirm', pathMatch: 'full' },
  { path: 'confirm', component: OrderConfirmComponent },//确认订单
  { path: 'pay', component: OrderPayComponent },//支付订单

]
//课程详情
const appCourseDetailsChild: Routes = [
  { path: '', redirectTo: 'introduce', pathMatch: 'full' },
  // 课程介绍
  { path: 'introduce', component: IntroduceComponent },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'arrange', component: ArrangeComponent },
  { path: 'evaluate', component: EvaluateComponent },
  { path: 'c-t-r', component: TeacherRecComponent }
]
const appHomeChildRoutes: Routes = [ // 3
  { path: '', redirectTo: 'rcourse', pathMatch: 'full' }, // main/home
  // 最热课程
  { path: 'hcourse', component: HotCourseComponent },
  // 推荐课程
  { path: 'rcourse', component: RecommendCourseComponent },
  // 名师
  { path: 'tt', component: TteacherComponent }
];
const appMainRoutes: Routes = [ // 2
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // 首页
  { path: 'home', component: HomeComponent, children: appHomeChildRoutes, canActivate: [CanIsParentActivate] },
  // 选课中心
  { path: 'course', component: CourseComponent, canActivate: [CanIsParentActivate] },
  // 个人资料
  { path: 'personal', component: PersonalComponent, canActivate: [CanLoginActivate], },
  // 学习
  { path: 'study', component: StudyComponent, canActivate: [CanLoginActivate], children: appMyStudyChild },
];

const appRoutes: Routes = [ // 1
  // 默认到登录
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // 登录
  { path: 'login', component: LoginComponent, canActivate: [CanIsLoginActivate] },
  // 登录
  // { path: 'login/:router', component: LoginComponent },
  // 首页
  { path: 'main', component: MainComponent, children: appMainRoutes },
  { path: 'search', component: SearchComponent },
  { path: 'courseDetails/:id', component: CourseDetailsComponent, children: appCourseDetailsChild }, //课程详情
  { path: 'order', component: OrderComponent, canActivate: [CanLoginActivate], children: appOrderChild }, //订单路由 ， 只有登录才能访问
  { path: 'myorder', component: MyOrderComponent, canActivate: [CanLoginActivate], children: appMyOrderChild },//
  { path: 'message', component: MessageComponenta, canActivate: [CanLoginActivate], children: appMyChildMessage },// 消息中心
  { path: 't-details', component: TeacherDetailsComponent },//教师详情
  { path: 'dis-details', component: DisDetailsComponent, canActivate: [CanLoginActivate] },//讨论区详情
  { path: 'p-d', component: PersonalDataComponent, canActivate: [CanLoginActivate] }, //个人资料
  { path: 'c-password', component: ChangePasswordComponent, canActivate: [CanIsPassWordActivate] }, //修改密码
  { path: 'pay', component: WxpayComponent, canActivate: [CanLoginActivate] }, //支付
  { path: 'p-home', loadChildren: './parent/parent.module#ParentModule', canActivate: [CanLoginActivate], },
  { path: 'bind', component: BindUserComponent },
  { path: 'rest', component: RestPassWordComponent },//忘记密码
  { path: 'upImg', component: UpImgComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModel { }
