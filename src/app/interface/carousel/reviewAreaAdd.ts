import { environment } from "../../../environments/environment";
import { RequestBase } from "../requestBase";


export class ReviewAreaAdd extends RequestBase {

    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    i_users_id: number;
    i_course_id: number;
    s_review_title: string;
}