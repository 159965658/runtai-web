import { PageBase } from "./pageBase";
import { environment } from "../../environments/environment";
import { RequestBase } from "./requestBase";
export class CourseModel extends RequestBase {
  constructor() {
    super();
    this.s_domain_name = environment.s_domain_name;
    this.pageIndex = 1;
    this.pageSize = 5;
  }
  public s_course_name: string;
  public pageIndex: number;
  // 1、首页搜索列表2、推荐课程3、最热课程
  public i_course_type: number;
  public pageSize: number;
}



export class CourseDetailsModel extends RequestBase {
  constructor() {
    super();
    this.s_domain_name = environment.s_domain_name;
  }
  i_user_id: number;
  public i_course_id: number; //课程id
  public i_sale_form: string; // 
}


export class GetCourseReviewArea extends PageBase {
  constructor() {
    super();
    this.pageIndex = 1;
    this.pageSize = 10;
    this.s_domain_name = environment.s_domain_name;
  }
  public i_course_id: number; //课程id
  public i_orderType:number;
}



export class GetCourseReviewReply extends PageBase { //获取讨论区回复列表
  constructor() {
    super();
    this.pageIndex = 1;
    this.pageSize = 10;
    this.s_domain_name = environment.s_domain_name;
  }
  public i_review_id: number; //课程id
}
