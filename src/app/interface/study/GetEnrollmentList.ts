import { PageBase } from "../pageBase";
import { environment } from "../../../environments/environment";

export class GetEnrollmentList extends PageBase {
    constructor() {
      super()
      this.pageIndex = 1;
      this.pageSize = 5;
      this.s_domain_name = environment.s_domain_name;
    }
   // i_invoice_phone: string;
    i_users_id: number;
   // i_course_id: number;
    i_EndType:number
  }