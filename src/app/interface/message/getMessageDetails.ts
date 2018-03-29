import { environment } from "../../../environments/environment";
import { RequestBase } from "../requestBase";


export class GetMessageDetails extends RequestBase {

    constructor() {
        super();
        this.s_domain_name = environment.s_domain_name;
    }
    i_user_id: number;
    i_messageid: number;
}