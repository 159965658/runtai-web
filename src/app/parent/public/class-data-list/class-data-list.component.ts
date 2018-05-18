import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GetSonCourseStatisticsRequest } from '../../../interface/user/get-son-course-statistics-request';
import { ChildService } from '../../../service/child.service';

@Component({
  selector: 'app-class-data-list',
  templateUrl: './class-data-list.component.html',
  styleUrls: ['./class-data-list.component.css']
})
export class ClassDataListComponent implements OnInit, AfterViewInit {


  constructor(private child: ChildService) { }
  @Input() id;
  @Input() pageIndex = 0;
  res = [];
  getListFlag = false;
  //observable = new Observable();
  public titleId: FormControl = new FormControl();
  public pageIndexF: FormControl = new FormControl();
  @Output() dataLength = new EventEmitter();
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.titleId.valueChanges.subscribe(res => { 
      this.pageIndex = 1;
      this.GetSonCourseStatistics(); 
    });
    this.pageIndexF.valueChanges.subscribe(res => {
  
      this.GetSonCourseStatistics();
    });
  }
  GetSonCourseStatistics() {
    this.res = [];
    let req = new GetSonCourseStatisticsRequest();
    req.i_users_id = this.id;
    this.getListFlag = false;
    req.pageIndex = this.pageIndex;
    this.child.GetSonCourseStatistics(req).subscribe(res => {

      if (res.StatusCode == 500) {
        this.res = [];
        return;
      }
    
      this.getListFlag = true;
      this.res = req.pageIndex > 1 ? this.res.concat(res) : res;
      this.dataLength.emit(res.length);
    });
  }


}
