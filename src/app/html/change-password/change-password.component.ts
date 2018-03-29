import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passWordValidator } from '../../Validator/password';
import { CourseService } from '../../service/course/course.service';
import { ChangePassWordRequest } from '../../interface/user/changePassWordRequest';
import { MessageService } from '../../service/message.service';
import { CacheService } from '../../service/cache/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: CourseService, private message: MessageService, private cache: CacheService, private router: Router) { }
  changePassWord: FormGroup;
  isLoading = false;
  ngOnInit() {
    this.changePassWord = this.fb.group({
      sp: [null, [Validators.required]],
      password: this.fb.group({
        np: ['', [Validators.required, Validators.minLength(6), Validators.pattern(new RegExp('^[A-Za-z0-9]+$'))]],
        anp: ['']
      }, { validator: passWordValidator })
      // np: [null, [Validators.required, Validators.minLength(6), Validators.pattern(new RegExp('^[A-Za-z0-9]+$'))]],
      // anp: [null, [Validators.required, passWordValidator]]
    });
    //console.log(this.changePassWord.get('password').get('np'));
  }
  onChangeSubmit() {
    for (const i in this.changePassWord.controls) {
      this.changePassWord.controls[i].markAsDirty();
    }
    if (this.changePassWord.valid) {
      this.isLoading = true;
      let changePass = new ChangePassWordRequest();
      changePass.s_paddword_old = this.changePassWord.get('sp').value;
      changePass.s_paddword = this.changePassWord.get('password').get('np').value;
      this.userService.ChangePassWord(changePass).subscribe(res => {
        this.isLoading = false;
        if (res == true) {
          this.message.setMessage({ error: 'success', message: '修改成功，正在跳转到登录页面。' });
          this.cache.removeUserModel();
          setTimeout(() => {
            this.router.navigate([' /login ']);
          }, 2000);
          return;
        }
      });
    }
  }

}
