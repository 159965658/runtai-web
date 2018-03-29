import { PageBase } from "../pageBase";

export class GetSonCourseStatisticsRequest extends PageBase {

    constructor() {
        super();
        this.pageIndex = 0;
        this.pageSize = 10;
    }
    i_users_id: number;
}
