import { Component, OnInit, OnDestroy } from '@angular/core';
import { CacheService } from '../../../service/cache/cache.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { passWordValidator } from '../../../Validator/password';
import { PhoneValidator } from '../../../Validator/phone-validator';
import { ShortMessageService } from '../../../service/short-message/short-message.service';
import { TeacherService } from '../../../service/teacher/teacher.service';
import { MessageService } from '../../../service/message.service';
import { Router } from '@angular/router';
import { CacheEnum } from '../../../enum/cacheEnum';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.css']
})
export class ChangePhoneComponent implements OnInit, OnDestroy {


  constructor(private router: Router,
    private cache: CacheService, private fb: FormBuilder, private shortMsg: ShortMessageService, private teacher: TeacherService, private message: MessageService) { }
  phone: string;
  formPhone: FormGroup;
  sendText = '获取验证码';
  shortMsgCode: number;
  isInput = false;
  time = null;
  user = null;
  ngOnInit() {
    this.initFormPhone();
    let user = this.cache.getUserModel();
    this.user = user;
    this.phone = user.ChildPhone;
  }
  ngOnDestroy(): void {
    clearInterval(this.time);
  }
  initFormPhone() {
    this.formPhone = new FormGroup({
      fphone: new FormControl('', [Validators.required, PhoneValidator]),
      msg: new FormControl('', [Validators.required])
    });
   
  }
  sendMsg() {
    if (!this.formPhone.controls.fphone.valid) {
      return;
    }
    let i = 60, th = this;
    this.postSendMsg();
    th.sendText = '60s';
    this.time = setInterval(function () {
      i--;
      th.sendText = i.toString() + 's';
      if (i <= 0) {
        clearInterval(this.time);
        th.sendText = '重新获取';
      }
    }, 1000);
  }
  postSendMsg() {
    this.sendText = '正在发送';
    let phone = this.formPhone.controls.fphone.value
   
    this.shortMsg.SendShort(phone).subscribe(res => {
   
      this.shortMsgCode = res;
    });
  }
  onChangePhone() {
   
    this.isInput = true;
    if (this.formPhone.get('msg').value != this.shortMsgCode) {
      setTimeout(() => {
        this.isInput = false;
        this.message.setMessage({ error: 'error', message: '验证码不正确' });
      }, 500);
      return false;
    }
    this.teacher.UserPhoneUntie(this.formPhone.controls.fphone.value).subscribe(res => {
      this.isInput = false;
      if (res == 'true' || res == true) {
        //更新缓存
        this.user.ChildPhone = this.formPhone.controls.fphone.value;
        this.cache.setLocalCache(CacheEnum.loginKey, this.user);
        this.message.setMessage({ error: 'success', message: '修改成功,自动跳转中' });
        setTimeout(() => {
          history.back();
        }, 1000);
      }
    });
  }

}
