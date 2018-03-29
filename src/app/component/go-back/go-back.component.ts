import { Component, OnInit, Input, style } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent implements OnInit {
  @Input() titleDetails: string;
  @Input() style: string;
  @Input() titleDetails2: string;
  styleFlag = 0;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.style == '2') {
      this.styleFlag = 2;
    }
    else if (this.style == '3') {
      this.styleFlag = 3;
    }
  }
  goBack() {
    let path = this.router.url;
    if (path.indexOf('myorder') > -1) {
      this.router.navigate(['/main/personal']);
    } else if (path.indexOf('/p-home/sonlist') > -1) {
      this.router.navigate(['/p-home/my']);
    }
    //  else if (path.indexOf('/courseDetails/') > -1) {
    //   this.router.navigate(['/p-home/my']);
    // }
    else {
      history.back();
    }
  }
}
