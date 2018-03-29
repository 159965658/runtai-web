import { Component, OnInit, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MessageService } from './service/message.service';
import { StaticModel } from './interface/staticModel';
import { CacheService } from './service/cache/cache.service';
import { CacheEnum } from './enum/cacheEnum';
import { SubjectEnum } from './enum/subjectEnum';
import { HttpBaseService } from './util/http-Base.service';
import { Urls } from './service/url';
import { CourseService } from './service/course/course.service';
import { sideIndex } from 'dhz-sideutil';
//enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private cahce: CacheService, private course: CourseService) {

    this.course.getSubjectCache().subscribe(subject => {
      // this.cahce.setLocalCache(CacheEnum.subject, subject);
    });
  }
  ngOnInit(): void {
    console.log(sideIndex(1))
    var url = window.location.href;
    var n = url.indexOf('code=');
    if (n > -1) {
      n = n + 5;
      var code = url.substr(n);
      var arr = code.split('&');
      this.cahce.setSessionCache(CacheEnum.weChat, arr[0]);
      // this.cahce.setSessionCache(CacheEnum.weChat, arr[0]);
    }
    this.router.events.filter((event) => event instanceof NavigationEnd)
      .subscribe(res => {
        window.scrollTo(0, 0);
      })

  }

  title = '京课';
}
