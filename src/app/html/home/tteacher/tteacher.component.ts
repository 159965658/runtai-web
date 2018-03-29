import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../service/teacher/teacher.service';
import { GetIndexTeacher } from '../../../interface/teacher/GetIndexTeacher';
import { ScrollService } from '../../../util/mutual/scroll.service';

@Component({
  selector: 'app-tteacher',
  templateUrl: './tteacher.component.html',
  styleUrls: ['./tteacher.component.css']
})
export class TteacherComponent implements OnInit {
  getAsyncFlag: boolean;
  req = new GetIndexTeacher();
  constructor(private teacherService: TeacherService, private scrollService: ScrollService) { }
  teacherList = new Array();
  ngOnInit() {
    this.getAsyncFlag = false;
    this.scrollService.defaultModel();
    this.GetIndexTeacher();
  }
  GetIndexTeacher() {
    if (this.getAsyncFlag) return;
    const getModel = this.scrollService.getModel();
    this.req.pageIndex = getModel.pageIndex + 1;
    this.teacherService.GetIndexTeacher(this.req).subscribe(res => {
    
      this.getAsyncFlag = true;
      if (res.length == 0) {
        return;
      }
      getModel.pageIndex = getModel.pageIndex + 1;
      this.scrollService.setModel(getModel);
      this.teacherList = this.teacherList.concat(res);
    })

  }
  numberIChange(i) {
    this.getAsyncFlag = false;
    this.GetIndexTeacher();
  }

}
