import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor() { }
  @Input() list;
  url = environment.pathImg;
  ngOnInit() {
  }
  getfooter(s_Absenteeism, s_Late, s_LeaveEarly, s_MissedSign, s_LateTime, s_LeaveEarlyTime) {
    return { s_Absenteeism: s_Absenteeism, s_Late: s_Late, s_LeaveEarly: s_LeaveEarly, s_MissedSign: s_MissedSign, s_LateTime: s_LateTime, s_LeaveEarlyTime: s_LeaveEarlyTime };
  }
}
