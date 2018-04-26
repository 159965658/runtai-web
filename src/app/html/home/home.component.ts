import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../../service/course/course.service';
import { ScrollService } from '../../util/mutual/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  columnTop: number;

  constructor(private courseServe: CourseService, private scrollService: ScrollService) { }

  ngOnInit() {

  }

}
