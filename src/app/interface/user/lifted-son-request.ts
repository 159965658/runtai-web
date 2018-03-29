import { RequestBase } from "../requestBase";
import { environment } from "../../../environments/environment";

export class LiftedSonRequest extends RequestBase {
    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    i_userid_id: number;
}
