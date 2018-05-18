import { LoginModel } from "./../../interface/loginModel";
import { CourseService } from "./../../service/course/course.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Http, Headers, Jsonp } from "@angular/http";
// tslint:disable-next-line:import-blacklist
import "rxjs/Rx";
import { environment } from "../../../environments/environment";
import { CacheService } from "../../service/cache/cache.service";
import { CacheEnum } from "../../enum/cacheEnum";
import { CacheUserModel } from "../../interface/cache/cacheUserModel";
import { PayService } from "../../service/pay.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  loginSourse: Observable<any>;
  loginModel: Observable<any>;
  errorText = "";
  queryParams = {
    router: ""
  };
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private courseService: CourseService,
    private cache: CacheService,
    private activatedRouer: ActivatedRoute,
    private pay: PayService
  ) { }
  ngOnInit() {
    this.restForm();
    this.activatedRouer.queryParams.subscribe(queryParams => {
      
      this.queryParams.router = queryParams.router;
    });
    //检测 是否是微信授权
    this.checkedWechat();
  }
  restForm() {
    this.formModel = this.fb.group({
      UserName: [null, [Validators.required]],
      PassWord: [null, [Validators.required, Validators.minLength(4)]]
    });
  }
  onSubmit(): void {
    for (const i in this.formModel.controls) {
      this.formModel.controls[i].markAsDirty();
    }
    if (this.formModel.valid) {
      const model = new LoginModel();
      model.s_paddword = this.formModel.value.PassWord;
      model.s_login_account = this.formModel.value.UserName;
      this.isLoading = true;
      this.courseService.GetLogin(model).subscribe(res => {
        this.isLoading = false;
        if (res.StatusCode === 500) {
          this.errorText = res.Data;
          return;
        }

        if (
          res.i_role_permission != 2 &&
          res.i_role_permission != 1 &&
          res.i_role_permission != 0
        ) {
          this.errorText = "账号不存在";
          this.restForm();
          return;
        }
        this.onBindUser(res);
      });
    }
  }
  onBindUser(res) {
    const jsonModel = res;
    let cacheModel = new CacheUserModel();
    cacheModel.UserName = jsonModel.s_real_name;
    cacheModel.ChildPhone = jsonModel.s_bind_mob;
    cacheModel.UserId = jsonModel.i_users_id;
    cacheModel.s_login_account = jsonModel.s_login_account;
    cacheModel.s_head_portrait = jsonModel.s_head_portrait;
    cacheModel.i_city_id = jsonModel.i_city_id;
    cacheModel.i_parents_id = jsonModel.i_parents_id;
    cacheModel.i_province_id = jsonModel.i_province_id;
    cacheModel.i_regionId = jsonModel.i_regionId;
    cacheModel.i_role_permission = jsonModel.i_role_permission;
    cacheModel.i_schoolId = jsonModel.i_schoolId;
    cacheModel.i_user_status = jsonModel.i_user_status;
    cacheModel.s_bind_mob = jsonModel.s_bind_mob;
    cacheModel.s_catholic_discipline = jsonModel.s_catholic_discipline;
    cacheModel.s_city = jsonModel.s_city;
    cacheModel.s_email = jsonModel.s_email;
    cacheModel.s_gender = jsonModel.s_gender;
    cacheModel.s_grade = jsonModel.s_grade;
    //cacheModel.s_head_portrait = jsonModel.s_head_portrait;
    cacheModel.s_highest_title = jsonModel.s_highest_title;
    cacheModel.s_login_account = jsonModel.s_login_account;
    cacheModel.s_nation = jsonModel.s_nation;
    cacheModel.s_nickname = jsonModel.s_nickname;
    cacheModel.s_origin = jsonModel.s_origin;
    cacheModel.s_parents_mob = jsonModel.s_parents_mob;
    cacheModel.s_parents_name = jsonModel.s_parents_name;
    cacheModel.s_post = jsonModel.s_post;
    cacheModel.s_province = jsonModel.s_province;
    cacheModel.s_qq = jsonModel.s_qq;
    cacheModel.s_region = jsonModel.s_region;
    cacheModel.s_school_abbreviation = jsonModel.s_school_abbreviation;
    cacheModel.s_study_section = jsonModel.s_study_section;
    cacheModel.i_invoice_phone = jsonModel.i_invoice_phone;
    cacheModel.s_domain_name = jsonModel.s_domain_name;
    this.cache.setLocalCache(CacheEnum.loginKey, cacheModel);
    //1.判读是否是家长
    // let url = '' + this.queryParams.router ? '' : this.queryParams.router;
    if (this.queryParams.router) {
      window.location.href = "/#/" + this.queryParams.router;
      //  this.router.navigate(['order/confirm?id=57']);
      return;
    }
    if (jsonModel.i_role_permission == 0) {
      this.router.navigate(["/main"]);
    } else if (
      jsonModel.i_role_permission == 2 ||
      jsonModel.i_role_permission == 1
    ) {
      //在p-home
      window.location.href = "/#/p-home";
    }
  }
  checkedWechat() {
    let weChatCode = this.cache.getSessionCache(CacheEnum.weChat);
    if (weChatCode) {
      //是微信授权
      this.cache.removeSessionCache(CacheEnum.weChat);
     
      this.pay.GetWeixinLogin(weChatCode).subscribe(res => {
        
        if (res.StatusCode == 201) {
         
          //oot8S0pK_-EDwXkh09B3NfMO20Sg
          this.router.navigate(["/bind"], {
            queryParams: {
              returnUri: this.queryParams.router,
              openId: res.Data
            }
          });
        } else if (res.StatusCode == 500) {
        } else {
          this.onBindUser(res);
        }
      });
    }
  }
  clickWe() {
    let url2 = "http://ijkapp.csruntitan.com/?#/login"; //http://localhost:4200/#/
    // let url2 = 'http://localhost:4200/?#/';
    let uri = "";
    if (this.queryParams.router) {
      uri = this.queryParams.router;
    } else {
      uri = "login";
    }
    url2 = encodeURIComponent(url2);
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      environment.appid +
      "&redirect_uri=" +
      url2 +
      "&response_type=code&scope=snsapi_userinfo&state=a#wechat_redirect";
  }
}
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeb4b65b6f630a479&redirect_uri=http%3a%2f%2fijkapp.csruntitan.com%2f%3f%23%2flogin&response_type=code&scope=snsapi_userinfo&state=a#wechat_redirect
