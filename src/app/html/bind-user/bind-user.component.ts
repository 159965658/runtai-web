import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CourseService } from "../../service/course/course.service";
import { CacheService } from "../../service/cache/cache.service";
import { Observable } from "rxjs/Observable";
import { CacheEnum } from "../../enum/cacheEnum";
import { CacheUserModel } from "../../interface/cache/cacheUserModel";
import { LoginModel } from "../../interface/loginModel";
import { PayService } from "../../service/pay.service";

@Component({
  selector: "app-bind-user",
  templateUrl: "./bind-user.component.html",
  styleUrls: ["./bind-user.component.css"]
})
export class BindUserComponent implements OnInit {
  formModel: FormGroup;
  loginSourse: Observable<any>;
  loginModel: Observable<any>;
  errorText = "";
  queryParams = {
    returnUri: "",
    openId: ""
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private cache: CacheService,
    private activatedRouer: ActivatedRoute,
    private pay: PayService
  ) { }
  ngOnInit() {
    this.restForm();
    this.activatedRouer.queryParams.subscribe(queryParams => {
     // console.log(queryParams);
      this.queryParams.returnUri = queryParams.returnUri;
      this.queryParams.openId = queryParams.openId;
    });
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
      this.pay
        .GetWeixinBind(
          this.queryParams.openId,
          model.s_login_account,
          model.s_paddword
        )
        .subscribe(res => {
         // console.log(res);
          if (res.StatusCode === 500) {
            this.errorText = res.Data;
            return;
          }
          let cacheModel = new CacheUserModel();
          if (
            res.i_role_permission != 2 &&
            res.i_role_permission != 0 &&
            res.i_role_permission != 1
          ) {
            this.errorText = "账号不存在";
            this.restForm();
            return;
          }
          const jsonModel = res;
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
          //  cacheModel.s_head_portrait = jsonModel.s_head_portrait;
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
          if (this.queryParams.returnUri) {
            window.location.href = "/#/" + this.queryParams.returnUri;
            //  this.router.navigate(['order/confirm?id=57']);
            return;
          }
          if (
            jsonModel.i_role_permission == 0 ||
            jsonModel.i_role_permission == 1
          ) {
            this.router.navigate(["/main"]);
          } else if (jsonModel.i_role_permission == 2) {
            //在p-home
            window.location.href = "/#/p-home";
          }
        });
    }
  }
}
