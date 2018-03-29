import { RequestBase } from "../requestBase";
import { environment } from "../../../environments/environment";

export class IndexHuiKuan extends RequestBase {
    constructor() {
        super()
        this.s_domain_name = environment.s_domain_name;
    }
    i_invoice_phone: string;
    i_users_id: number;
    i_course_id: number;
}
