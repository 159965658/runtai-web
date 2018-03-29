import { environment } from "../../../environments/environment";
import { RequestBase } from "../requestBase";
import { PageBase } from "../pageBase";


export class GetCourseAppraiseList extends PageBase {
    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
        this.pageIndex = 0;
        this.pageSize = 10;
    }
    i_course_id: number;
}