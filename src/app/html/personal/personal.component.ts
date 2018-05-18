import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../service/cache/cache.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StudyService } from '../../service/study/study.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(private cache: CacheService, private router: Router, private study: StudyService) { }
  user = null;
  url = environment.api;
  res = {
    bePaidCount: 0,
    beingCount: 0,
    finishCount: 0
  }
  ngOnInit() {
    const userModel = this.cache.getUserModel();
    this.user = userModel;
    this.GetUserStatistics();
  }
  GetUserStatistics() {
    this.study.GetUserStatistics().subscribe(res => {
   
      this.res = res;
    });
  }
  loginOut() {
  
    this.cache.removeUserModel();//退出登录
    this.router.navigate(['/login']);
  }

}
