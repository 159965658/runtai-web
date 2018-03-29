import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../service/cache/cache.service';
import { CacheEnum } from '../../enum/cacheEnum';
import { UtilMethodService } from '../../util/util-method.service';
import { CourseModel } from '../../interface/courseModel';
import { CourseService } from '../../service/course/course.service';
import { Observable } from 'rxjs/Observable';
import { ScrollService } from '../../util/mutual/scroll.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  getAsyncFlag = false;
  getListFlag: any;
  msgFlag = true;
  searchCache = [];
  contentFlag = false;
  coursel = [];
  inputValue: string;
  constructor(private cache: CacheService, private util: UtilMethodService, private courseService: CourseService, private scrollService: ScrollService) { }

  ngOnInit() { 
    this.getListFlag = true;
    this.msgFlag = true;
    this.searchCache = JSON.parse(this.cache.getLocalCache(CacheEnum.searchKey));
    this.scrollService.defaultModel();
    if (this.searchCache == null) {
      this.searchCache = [];
    }
    Observable.fromEvent(window, 'scroll').subscribe((event) => {
      const bodyh = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高度
      const t = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
      const scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //滚动高度    
      if (bodyh + t > (scrollH - 10)) {
        if (this.getListFlag) {
          this.getListFlag = false;
          this.GetIndexCourse(this.inputValue);
        }
      }
    })
  }
  changeSearch(value) {
    if (value.trim() == "") {
      this.contentFlag = false;//隐藏内容
      return;
    }
    this.contentFlag = true;//显示内容
    this.inputValue = value;
    this.coursel = [];
    const getModel = this.scrollService.defaultModel();
    this.searchCache = JSON.parse(this.cache.getLocalCache(CacheEnum.searchKey));
    let cacheModel = { "value": value, 'dateTime': this.util.getRangeDate(0) };
    if (this.searchCache != null) {
      this.searchCache = this.searchCache.filter((a) => a.value != this.inputValue);//排除已经存在的条件
      if (this.searchCache.length > 5) { //移除第一条 大于5条更新
        this.searchCache.shift();
      }
      this.searchCache.push(cacheModel);
      this.cache.setLocalCache(CacheEnum.searchKey, this.searchCache);
    }
    else {
      this.searchCache = [];
      this.searchCache.push(cacheModel);
      this.cache.setLocalCache(CacheEnum.searchKey, this.searchCache);
    }
    this.GetIndexCourse(value);

  }
  GetIndexCourse(value) {
    this.getAsyncFlag = false;
    const req = new CourseModel();
    const getModel = this.scrollService.getModel();
    req.i_course_type = 1;
    req.s_course_name = value;
    req.pageIndex = getModel.pageIndex;
    this.courseService.GetIndexCourse(req).subscribe(res => {
      this.getAsyncFlag = true;
      if (res.length == 0) {
        this.getListFlag = false;
        return;
      }
      if (getModel.pageIndex == 1) {

        this.coursel = res;

      } else {
        this.coursel = this.coursel.concat(res);
      }
      this.getListFlag = true;
      getModel.pageIndex = getModel.pageIndex + 1;
      this.scrollService.setModel(getModel);
    });
  }
  removeLocal(value) {
    this.searchCache = JSON.parse(this.cache.getLocalCache(CacheEnum.searchKey));
    this.searchCache = this.searchCache.filter(a => a.value != value);
    this.cache.setLocalCache(CacheEnum.searchKey, this.searchCache);
  }
  SearchLocal(value){
    this.changeSearch(value)
  }
}
