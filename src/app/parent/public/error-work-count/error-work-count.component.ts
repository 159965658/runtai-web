import { Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ChildService } from '../../../service/child.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-error-work-count',
  templateUrl: './error-work-count.component.html',
  styleUrls: ['./error-work-count.component.css']
})
export class ErrorWorkCountComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private child: ChildService) { }
  errorCount = {
    absenteeismCount: 0,
    lateCount: 0, leaveEarlyCount: 0,
    missedSignCount: 0
  }
  obser = new Subscription();
  hoverId: number;
  @Output() clickDom = new EventEmitter();
  ngOnInit() {
    this.defaultDom();
  }
  defaultDom() {
    setTimeout(() => {
      this.hoverId = 1;
    }, 100);
  }
  //获取统计数
  getCount(id) {
    if (id)
      this.getErrorCount(id);
  }
  private getErrorCount(id) {
    this.defaultDom();
    this.child.GetSonErrorStatistics(id).subscribe(res => {
      this.errorCount = res;
    });
  }
  ngOnDestroy(): void {

  }
  ngAfterViewInit(): void {

  }
  onClickDom(id) {
    this.hoverId = id;
    this.clickDom.emit(id);
  }
}
