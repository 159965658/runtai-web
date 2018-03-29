import { PageBase } from "../pageBase";
import { environment } from "../../../environments/environment";

export class GetCombinationCourseWareRequest extends PageBase {
    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    i_course_id: number;
    i_orderType: number;
}
