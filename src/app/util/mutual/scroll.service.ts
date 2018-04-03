import { Injectable } from '@angular/core';
import { CourseService } from '../../service/course/course.service';

@Injectable()
export class ScrollService {

  constructor() { }
  model = new ScrollModel();
  hflag = false;
  cflag = false;
  //model.pageIndex = 1
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.model.pageIndex = 1;
  }
  setModel(req: ScrollModel) {
    this.model = req;
  }
  //加载数据
  getList() {
    //this.courseService.GetIndexCourse();
  }
  getModel() {
    return this.model;
  }
  defaultModel() {
    this.model = new ScrollModel();
    return this.model;
  }
}
export class ScrollModel {
  public pageIndex: number = 0;
  public actionName: string;
}