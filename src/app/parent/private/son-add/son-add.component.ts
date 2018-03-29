import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddSonRequest } from '../../../interface/user/add-son-request';
import { ChildService } from '../../../service/child.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-son-add',
  templateUrl: './son-add.component.html',
  styleUrls: ['./son-add.component.css']
})
export class SonAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private son: ChildService, private router: Router) { }
  sonAdd: FormGroup;
  isInput = false;
  ngOnInit() {
    this.resetForm();
  }
  resetForm() {
    this.sonAdd = this.fb.group({
      name: ['', [Validators.required]],
      account: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    let req = new AddSonRequest();
    req.s_loginName = this.sonAdd.value.account; //登录账号
    req.s_paddWord = this.sonAdd.value.password; //登录密码
    req.s_real_name = this.sonAdd.value.name; //学生姓名
    this.addSon(req);
  }
  addSon(req: AddSonRequest) {
    // let req = new AddSonRequest();
    this.isInput = true;
    this.resetForm();
    this.son.AddSon(req).subscribe(res => {
      this.isInput = false;
      if (res == true) {
        this.son.clearSon();
        setTimeout(() => {
          this.router.navigate(['p-home/sonlist']);
        }, 300);
      }
    });
  }

}
