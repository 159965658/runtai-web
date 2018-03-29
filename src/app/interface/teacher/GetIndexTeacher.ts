import { PageBase } from "../pageBase";
import { environment } from "../../../environments/environment";

export class GetIndexTeacher extends PageBase {
    constructor() {
        super();
        this.pageIndex = 1;
        this.s_domain_name = environment.s_domain_name;
    }
    teacher_id: number;
    pageSize: number = 10;
}
