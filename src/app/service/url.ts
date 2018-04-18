import { host, pay } from "./hostApi";
export const Urls = {
  GetLogin: host + "/WebSite/GetIndexLogin", //登录接口
  GetIndexCourse: host + "/WebSite/GetIndexCourse", //获取课程 最热 推荐
  GetIndexBanner: host + "/WebSite/GetIndexBanner", //获取Banner
  GetElectiveCenter: host + "/WebSite/GetElectiveCenter", //获取选课中心
  GetIndexTeacher: host + "/WebSite/GetIndexTeacher", //授课名师
  GetTeacherDetails: host + '/WebSite/GetTeacherDetails',//获取教师详情
  GetTeacherCourse: host + '/WebSite/GetTeacherCourse',//获取推荐名师课程
  GetCourseDetails: host + '/WebSite/GetCourseDetails', //获取课程详情
  GetCombinationCourse: host + '/WebSite/GetCombinationCourse',//获取组合课程详情
  GetCourseWare: host + '/WebSite/GetCourseWare', //获取课程安排
  IndexHuiKuan: host + '/WebSite/IndexHuiKuan',//提交订单
  GetCourseOrder: host + '/WebSite/GetCourseOrder',//获取订单详情
  GetCourseOrderList: host + '/WebSite/GetCourseOrderList', //获取订单列表
  GetEnrollmentList: host + '/WebSite/GetEnrollmentList',//我的课程
  CourseCalendarPhoneSearch: host + '/WebSite/GetCourseCalendarByPC',//我的课程日历
  GetCourseReviewArea: host + '/WebSite/GetCourseReviewArea',//获取讨论区
  GetCourseReviewReply: host + '/WebSite/GetCourseReviewReply',//获取讨论区回复列表
  GetCourseReviewAreaDetails: host + '/WebSite/GetCourseReviewAreaDetails',//获取讨论区详情
  CourseReviewAreaAdd: host + '/WebSite/CourseReviewAreaAdd',//评论讨论区增加
  CourseReviewAreaLike: host + '/WebSite/CourseReviewAreaLike',//讨论区点赞
  CourseReviewReplyAdd: host + '/WebSite/CourseReviewReplyAdd',//讨论区评论增加
  CourseReviewReplyLike: host + '/WebSite/CourseReviewReplyLike',//讨论区评论点赞
  GetCourseAppraiseList: host + '/WebSite/GetCourseAppraiseList',//获取课程评价
  CourseReviewAreaSubmit: host + '/WebSite/CourseReviewAreaSubmit',//增加评论区
  CourseAppraiseLike: host + '/WebSite/CourseAppraiseLike',//课程评价点赞
  GetCourseTeacher: host + '/WebSite/GetCourseTeacher',//获取讲师介绍
  GetMessageList: host + '/WebSite/GetMessageList',//获取消息列表
  GetMessageDetails: host + '/WebSite/GetMessageDetails',//获取消息详情
  UpdatePassWord: host + '/WebSite/UpdateUserPassword',//重置密码
  WxPay: pay + '/wxProcess2.aspx', //微信支付
  GetButtonValue: host + '/WebSite/GetButtonValue',//获取课程详情按钮
  GetSonList: host + '/WebSite/GetSonList',//获取孩子列表
  AddSon: host + '/WebSite/AddSon',//添加孩子
  GetSonDetails: host + '/WebSite/GetSonDetails',//获取孩子详情
  CancelHuikuan: host + '/WebSite/CancelHuikuan',//取消订单
  GetUserStatistics: host + '/WebSite/GetUserStatistics',//获取学生个人中心统计
  LiftedSon: host + '/WebSite/LiftedSon',//解除关联
  Send: host + '/WebSite/GetPhoneCode',//发送短信
  GetSubjectList: host + '/WebSite/GetSubjectList',//获取学科列表
  GetCourseCalendarByParent: host + '/WebSite/GetCourseCalendarByParent',//获取学科列表
  GetSonErrorStatistics: host + '/WebSite/GetSonErrorStatistics',//统计家长端孩子异常考勤情况
  GetSonCourseStatistics: host + '/WebSite/GetSonCourseStatistics',//家长端孩子课程文字统计
  GetSonStatistics: host + '/WebSite/GetSonStatistics',//统计家长端孩子信息
  GetWeixinLogin: host + '/WebSite/GetWeixinLoginByPhone',//微信登录
  GetWeixinBind: host + '/WebSite/GetWeixinBind',//微信绑定
  UserPhoneUntie: host + '/WebSite/UserPhoneUntie',//绑定手机号
  RecoverPassword: host + '/WebSite/RecoverPassword',//忘记密码
  GetCombinationCourseWare: host + '/WebSite/GetCombinationCourseWare',//获取推荐组合课程安排
  GetCourseErrorByParent: host + '/WebSite/GetCourseErrorByParent',//获取异常考勤列表
  UserGenseeBind: host + '/WebSite/UserGenseeBind',//添加章节
  GetCourseCalendarByParentRed: host + '/WebSite/GetCourseCalendarByParentRed',//获取图片
  GetToken: host + '/WebSite/GetToken',//获取token
  // GetCourseResources: host +'/WebSite/GetCourseResources'
};
