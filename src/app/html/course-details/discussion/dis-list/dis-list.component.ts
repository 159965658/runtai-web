import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseReviewReplyLike } from '../../../../interface/carousel/courseReviewReplyLike';
import { CacheService } from '../../../../service/cache/cache.service';
import { CourseService } from '../../../../service/course/course.service';
import { environment } from '../../../../../environments/environment';
import { MessageService } from '../../../../service/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dis-list',
  templateUrl: './dis-list.component.html',
  styleUrls: ['./dis-list.component.css']
})
export class DisListComponent implements OnInit {

  constructor(private cache: CacheService, private courseService: CourseService, private message: MessageService, private router: Router) { }
  @Input() list;
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }
  url = environment.pathImg;
  CourseReviewReplyLike(id) { //点赞讨论区
    if (!this.courseService.content.flag) {
      this.message.setMessage({ error: 'error', message: '您无法操作' });
      return false;
    }
    let request = new CourseReviewReplyLike();
    request.i_course_id = this.list.i_course_id;
    request.i_id = id;
    this.courseService.CourseReviewAreaLike(request).subscribe(res => {
      if (res) {
        this.addClick.emit({ id: id, success: res });
      }
    });
  }
  href(id) {
    if (!this.courseService.content.flag) {
      return false;
    }
    this.router.navigate(['/dis-details'], {
      queryParams: {
        id: id
      }
    });
    // [routerLink]="['/dis-details']" [queryParams]="{id:list?.i_id}"
  }
}
