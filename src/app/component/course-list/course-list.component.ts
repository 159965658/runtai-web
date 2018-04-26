import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CourseService } from '../../service/course/course.service';
import { CacheService } from '../../service/cache/cache.service';
import { CacheEnum } from '../../enum/cacheEnum';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private router: Router, private course: CourseService, private cache: CacheService) { }
  @Input() courseList = [];
  url = environment.pathImg;
  ngOnInit() {
  }
  href(id, type) {
    this.course.content.type = type;
    this.cache.setSessionCache(CacheEnum.routerHis, this.router.url);
    this.router.navigate(['/courseDetails/' + id + '/introduce'], {
      queryParams: {
        type: type
      }
    });
  }
}
