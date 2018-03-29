import { RequestBase } from "../requestBase";
import { environment } from "../../../environments/environment";
export class GetButtonValue extends RequestBase {
    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    i_user_id: number;
    i_course_id: number;
}