import { environment } from "../../environments/environment";

export const host = environment.api + '/api';
export const pay = 'http://wxpay.ijkedu.com';
//验证ajax请求需要登录的地址后缀
export const urlOwen = 'CourseReviewAreaAdd,CourseReviewAreaLike,CourseReviewReplyAdd,CourseReviewReplyLike,CourseReviewAreaSubmit,CourseAppraiseLike'
