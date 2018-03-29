
import { environment } from "../../../environments/environment";
import { RequestBase } from "../requestBase";
import { PageBase } from "../pageBase";

export class GetTeacherDetails extends RequestBase {
    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    teacher_id: number;
}


export class GetTeacherCourse extends PageBase {
    constructor() {
        super();
        this.pageIndex = 1;
        this.pageSize = 10;
        this.s_domain_name = environment.s_domain_name;
    }
    teacher_id: number;
}