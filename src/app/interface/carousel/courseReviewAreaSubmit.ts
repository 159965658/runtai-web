import { environment } from "../../../environments/environment";
import { RequestBase } from "../requestBase";


export class CourseReviewAreaSubmit extends RequestBase {

    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    i_users_id: number;
    i_course_id: number;
    s_appraise_text: string;
}