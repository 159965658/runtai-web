import { PageBase } from "../pageBase";
import { environment } from "../../../environments/environment";

export class GetCourseOrderList extends PageBase{
    constructor(){
        super()
        this.pageIndex = 0;
        this.s_domain_name = environment.s_domain_name;
    }
    public i_order_type:number;
    public i_users_id:number;
    
}