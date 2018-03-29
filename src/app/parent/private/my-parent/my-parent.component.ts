import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CacheService } from '../../../service/cache/cache.service';
import { Router } from '@angular/router';
import { ChildService } from '../../../service/child.service';

@Component({
  selector: 'app-my-parent',
  templateUrl: './my-parent.component.html',
  styleUrls: ['./my-parent.component.css']
})
export class MyParentComponent implements OnInit {

  constructor(private cache: CacheService, private router: Router, private child: ChildService) { }

  user = null;
  url = environment.pathImg;
  uc = {
    courseCount: 0,
    errorCount: 0,
    sonCount: 0
  }
  ngOnInit() {
    const userModel = this.cache.getUserModel();
    this.user = userModel;
    this.child.GetSonStatistics().subscribe(res => {
      this.uc = res;
    });
  }
  loginOut() {
    console.log('退出登录');
    this.cache.removeUserModel();//退出登录
    this.router.navigate(['/login']);
  }
}
