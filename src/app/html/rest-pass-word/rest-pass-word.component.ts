import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { passWordValidator } from '../../Validator/password';
import { ShortMessageService } from '../../service/short-message/short-message.service';
import { PhoneValidator } from '../../Validator/phone-validator';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-rest-pass-word',
  templateUrl: './rest-pass-word.component.html',
  styleUrls: ['./rest-pass-word.component.css']
})
export class RestPassWordComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private shortMsg: ShortMessageService, private message: MessageService) { }
  changePassWord: FormGroup;
  isInput = false;
  sendText = '发送验证码';
  shortMsgText = '我是一个验证码';
  ngOnInit() {
    this.changePassWord = this.fb.group({
      account: ['', [Validators.required]],
      phone: new FormControl('', [Validators.required, PhoneValidator]),//new FormControl('', [Validators.required, PhoneValidator]),
      msg: ['', [Validators.required, Validators.maxLength(6)]],
      password: this.fb.group({
        np: ['', [Validators.required, Validators.minLength(6), Validators.pattern(new RegExp('^[A-Za-z0-9]+$'))]],
        anp: ['']
      }, { validator: passWordValidator })
      // np: [null, [Validators.required, Validators.minLength(6), Validators.pattern(new RegExp('^[A-Za-z0-9]+$'))]],
      // anp: [null, [Validators.required, passWordValidator]]
    });
    //  console.log(this.changePassWord);
    //console.log(this.changePassWord.get('password').get('np'));
  }
  sendMsg() {

    console.log(this.changePassWord, this.changePassWord.controls.phone.hasError('PhoneValidator'));
    if (!this.changePassWord.controls.phone.valid) {
      return;
    }
    let i = 60, th = this;
    this.postSendMsg();
    th.sendText = '60s';
    let time = setInterval(function () {
      i--;
      th.sendText = i.toString() + 's';
      if (i == 0) {
        clearInterval(time);
        th.sendText = '获取验证码';
      }
    }, 1000);
  }
  postSendMsg() {
    this.sendText = '正在发送';
    this.shortMsg.SendShort(this.changePassWord.controls.phone.value).subscribe(res => {
      console.log(res);
      this.shortMsgText = res;
    });
  }
  onChangeSubmit() {
    this.isInput = true;
    if (this.changePassWord.get('msg').value != this.shortMsgText) {
      setTimeout(() => {
        this.isInput = false;
        this.message.setMessage({ error: 'error', message: '验证码不正确' });
      }, 500);
      return false;
    }
    this.shortMsg.RecoverPassword(this.changePassWord.get('account').value, this.changePassWord.get('password').get('np').value,this.changePassWord.get('phone').value).subscribe(res => {
      console.log(res);
      this.isInput = false;
      if (res == 'true' || res == true) {
        this.message.setMessage({ error: 'success', message: '重置密码成功，正在跳转登录' });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
    });
  }
}
