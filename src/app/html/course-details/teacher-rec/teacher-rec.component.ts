import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../service/course/course.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-teacher-rec',
  templateUrl: './teacher-rec.component.html',
  styleUrls: ['./teacher-rec.component.css']
})
export class TeacherRecComponent implements OnInit {

  constructor(private courserService: CourseService) { }
  arrList = [];
  url = environment.pathImg;
  ngOnInit() {
    this.courserService.setnavHover(5);
    this.courserService.GetCourseTeacher().subscribe(res => {
    //  console.log(res);
      this.arrList = res;
    })
  }

}
