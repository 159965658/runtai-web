import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-loading',
  templateUrl: './header-loading.component.html',
  styleUrls: ['./header-loading.component.css']
})
export class HeaderLoadingComponent implements OnInit {

  constructor() { }
  flag = false;
  ngOnInit() {
    // $('#progress').removeClass('running').delay(10).queue(function(next){
    // 	$(this).addClass('running');
    // 	next();
    // });
  }

}
