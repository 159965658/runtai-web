import { RequestBase } from "../requestBase";
import { environment } from "../../../environments/environment";

export class ChangePassWordRequest extends RequestBase {
    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    s_paddword: string;
    s_paddword_old: string;
    i_users_id: number;
}