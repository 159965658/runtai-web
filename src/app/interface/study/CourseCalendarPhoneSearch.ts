import { environment } from "../../../environments/environment";
import { RequestBase } from "../requestBase";

export class CourseCalendarPhoneSearch extends RequestBase {
    constructor() {
        super()
        this.s_domain_name = environment.s_domain_name;
    }
    i_users_id: number;
    startTime: string;
    endTime: string;
}