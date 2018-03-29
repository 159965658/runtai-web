import { environment } from "../../environments/environment";
import { PageBase } from "./pageBase";
export class GetElectiveCenter extends PageBase {
  constructor() {
    super();
    this.s_domain_name = environment.s_domain_name;
    this.pageIndex = 1; 
  }
  public s_course_name: string; 
  public i_course_circle: number = 2;
  public i_study_section: number;
  public i_grade:number;
  public i_subject:number;
  public i_orderby:number;
  public i_sale_form:number;
  public courseName:string;
}
