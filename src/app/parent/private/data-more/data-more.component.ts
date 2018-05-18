import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-more',
  templateUrl: './data-more.component.html',
  styleUrls: ['./data-more.component.css']
})
export class DataMoreComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.activedRouter.queryParams.subscribe(res => {
      this.id = res.id
    });
  }
  constructor(private activedRouter: ActivatedRoute) { }
  id;
  pageIndex = 0;
  asyncFlag = true;
  ngOnInit() {

  }
  changeScroll() {
    if (this.asyncFlag)
      this.pageIndex++;
  }
  endList($event) {
    if ($event < 10)
      this.asyncFlag = false;
    
  }
}
