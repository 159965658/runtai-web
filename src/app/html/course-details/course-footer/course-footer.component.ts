import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../service/course/course.service';
import { CacheService } from '../../../service/cache/cache.service';
import { MessageService } from '../../../service/message.service';

@Component({
  selector: 'app-course-footer',
  templateUrl: './course-footer.component.html',
  styleUrls: ['./course-footer.component.css']
})
export class CourseFooterComponent implements OnInit {
  @Input() id: any;
  constructor(private router: Router, private course: CourseService, private cache: CacheService, private message: MessageService) { }
  btnFlag: boolean;
  buttonValue: string = '立即报名';
  ngOnInit() {
    this.GetButtonValue();
  }
  clickHref() {
    this.router.navigate(['/order'], {
      queryParams: {
        id: this.id
      }
    })
  }
  GetButtonValue() {//获取按钮状态 
    console.log(this.router.url);
    let user = this.cache.getUserModel();
    if (!user)
      return;
    this.course.GetButtonValue(this.id).subscribe(res => {
      this.btnFlag = res.buttonFlag == 'true' ? false : true;
      if (res.buttonData != '')
        this.message.setMessage({ error: 'error', message: res.buttonData });
      this.buttonValue = res.buttonValue;
    });
  }
}
