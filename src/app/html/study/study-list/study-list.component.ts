import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { count } from 'rxjs/operators/count';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.css']
})
//只关心页面滚动 
export class StudyListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    //if (this.isScroll) {
    console.log(this._scrollInitScbipt)
    this._scrollInitScbipt == undefined ? "" : this._scrollInitScbipt.unsubscribe();//关闭滚动监控
    //}
  }
  //滚动到底触发
  @Output() changeScroll = new EventEmitter();
  constructor() { }
  //是否开启滚动
  @Input() isScroll = true;
  // @Input() isScrollNumber: number = 0;
  _scrollInitScbipt: Subscription;
  ngOnInit() {
    if (this.isScroll) {
      this._scrollInit();
    }
  }
  _scrollInit() {
    const bodyh = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高度
    this._scrollInitScbipt = Observable.fromEvent(window, 'scroll').subscribe((event) => {
      const t = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
      const scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //滚动高度   
      if (bodyh + t > (scrollH - 2)) {

        this.changeScroll.emit();
        // Observable.fromEvent(document, 'click').scan(c => c+1,0);
      }
    })
  }
}
