import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildService } from '../../../service/child.service';

@Component({
  selector: 'app-son-details',
  templateUrl: './son-details.component.html',
  styleUrls: ['./son-details.component.css']
})
export class SonDetailsComponent implements OnInit {

  constructor(private activaRouter: ActivatedRoute, private child: ChildService, private router: Router) { }
  id: number;
  res: any;
  pop = false;
  isInput = false;
  l: number;
  ngOnInit() {
    this.activaRouter.queryParams.subscribe(res => {
      this.id = res.id;
      this.l = res.l;
    });
    this.GetSonDetails();
  }
  GetSonDetails() {
    this.child.GetSonDetails(this.id).subscribe(res => {
      // console.log(res);
      this.res = res;
    })
  }
  popChild() {
    if (this.child.childList == 1 || this.l == 1) {
      this.router.navigate(['/p-home/son-add']);
      return false;
    }
    this.pop = false;
  }
  confirmRelieve() {
    this.pop = false;
    this.isInput = true;
    this.child.LiftedSon(this.id).subscribe(res => {
      this.isInput = false;
      if (res == 'true' || res == true) {
        this.child.clearSon();
        setTimeout(() => {
          this.router.navigate(['p-home/sonlist']);
        }, 300);
      }
    });
  }
}
