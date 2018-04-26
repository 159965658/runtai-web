import { Injectable } from '@angular/core';
import { CacheService } from '../service/cache/cache.service';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import * as moment from 'moment';
@Injectable()
export class UtilMethodService {

  constructor(private router: Router, private message: MessageService) { }
  canLogin(userModel) {

    // let path = route.routeConfig.path;
    let jsPath = window.location.href;
    let path = jsPath.substring(jsPath.indexOf("#") + 1, jsPath.length);
    if (userModel) {
      return this.canisParent(userModel);
    }
    setTimeout(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          router: path
        }
      });
    }, 100)
    return false;
  }
  canIsViewParent(res) {
    if (res == null || res == "[]" || res.length == 0) {
      let url = ['/p-home/main', '/p-home/love'];
      let jsPath = window.location.href;
      let urrf = false;
      console.log(jsPath, this.router.url);
      url.forEach(element => { //是否有登录控制
        if (this.router.url == element) {
          urrf = true;
        }
      });
      if (urrf) {
        this.message.setMessage({ error: 'error', message: '您未添加孩子' });
        this.router.navigate(['/p-home']);
        return false;
      }
    }
    else {
      console.log('允许');
      // this.router.navigate([route['_routerState'].url]);
      return true;
    }
  }
  canisParent(userModel) {
    if (!userModel) {
      return true;
    }
    let into = this.isUserView(userModel);

    console.log(into);
    if (into == 2) { //允许操作
      return true;
    }
    else if (into == 1) { //跳转到家长
      setTimeout(() => {
        window.location.href = '/#/p-home';
      }, 300);
      //window.location.href = '/#/p-home';
      //this.router.navigate(['/p-home']);
      return false;
    }
    else if (into == 0) {
      setTimeout(() => {
        window.location.href = '/#/main';
      }, 300);

      return false;
    }
  }
  objectString(value): string { //json对象转 方法
    if (typeof value == 'object') {
      value = JSON.stringify(value);
    }
    return value;
  }
  /**
   * @param {number} range
   * @param {string} [type]
   * @memberOf VehicleOverviewComponent
   * @description 获取今天及前后天
   */
  getRangeDate(range: number, type?: string) {
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      const hour = Dates.getHours() < 10 ? "0" + Dates.getHours() : Dates.getHours();
      const minute = Dates.getMinutes() < 10 ? "0" + Dates.getMinutes() : Dates.getMinutes();
      const second = Dates.getSeconds() < 10 ? "0" + Dates.getSeconds() : Dates.getSeconds();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    };

    const now = formatDate(new Date().getTime()); // 当前时间
    const resultArr: Array<any> = [];
    let changeDate: string;
    if (range == 0) {
      return now;
    }
    if (range) {
      if (type) {
        if (type === 'one') {
          changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
          console.log(changeDate);
        }
        if (type === 'more') {
          if (range < 0) {
            for (let i = Math.abs(range); i >= 0; i--) {
              resultArr.push(formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
              console.log(resultArr);
            }
          } else {
            for (let i = 1; i <= range; i++) {
              resultArr.push(formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
              console.log(resultArr);
            }
          }

        }
      } else {
        changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
        console.log(changeDate);
      }
    }
    return changeDate;
  }
  orderBy(a, b, orderid, orderFun) {
    if (orderFun == 'desc') {
      return b[orderid] < a[orderid] ? 1 : -1;
    }
    else {
      return b[orderid] > a[orderid] ? 1 : -1;
    }
  }
  /**
 * @param {any} value
 * @param {string} [str]
 *  @param {hourFlag} boolean 小时是否显示
 *  @param {secondFlag} boolean 秒数是否显示
 * @memberOf VehicleOverviewComponent
 * @description 时间戳转时间
 */
  timesTamp(value, str = '/', hourFlag = true, secondFlag: boolean = true) {
    let birthday = new Date();
    birthday.setTime(value * 1000);
    let year = birthday.getFullYear();
    let month = birthday.getMonth() + 1;
    let date = birthday.getDate();
    let hour = birthday.getHours();
    let minute = birthday.getMinutes();
    let second = birthday.getSeconds();
    let reValue = year + str + month + str + date;

    if (hourFlag) {
      reValue = year + str + month + str + date + ' ' + hour + ":" + minute;
    }
    if (hourFlag && secondFlag) {
      reValue += ":" + second;
    }
    return reValue;
  }
  month(value: number) {
    return ((value + 1) > 9 ? (value + 1) : '0' + (value + 1)).toString()
  }
  isUserView(userModel): number { //判断是否允许家长访问该页面
    let jsPath = window.location.href;
    let index = jsPath.indexOf('p-home');
    console.log(userModel.i_role_permission);
    if (userModel.i_role_permission == 2 && index > -1) { //家长登录 ，家长的页面
      return 2;
    }
    else if (userModel.i_role_permission <= 1 && index < 0) { //学生登录 ， 学生的页面
      return 2;
    }
    else if (userModel.i_role_permission == 2 && index < 0) { //家长登录 , 学生页面
      return 1;
    }
    else if (userModel.i_role_permission <= 1 && index > -1) { //学生登录,家长页面
      return 0;
    }
    // return 0;
  }
  /*
 * 动态添加 CSS 样式
 * @param selector {string} 选择器
 * @param rules    {string} CSS样式规则
 * @param index    {number} 插入规则的位置, 靠后的规则会覆盖靠前的，默认在后面插入
 */
  addCssRule() {
    // 创建一个 style， 返回其 stylesheet 对象 
    let style = document.createElement('style');
    style.type = 'text/css';
    document.head.appendChild(style);

    // 返回接口函数
    return function (selector, rules, index) {
      index = index || 0;
      //  style.sheet.insertRule(selector + "{" + rules + "}", index);
    }
  };
  /*
 * 图片转base64
 * @param selector {img} img 对象 
 */

  getBase64Image(img: File): FileReader {
    if (img) {
      if (!/image\/\w+/.test(img.type))           //判断获取的是否为图片文件
      {
        alert("请确保文件为图像文件");
        return null;
      }
      var reader = new FileReader();
      //将文件以Data URL形式读入页面  
      reader.readAsDataURL(img);
      return reader;
    }
    return null;
    // return dataURL.replace("data:image/png;base64,", "");
  }
  /*
计算角度
*/
  getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }

    return result;
  }
  //获得角度
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }
  // 生成签名的时间戳
  myTimeUnix(): any {
    //const UnixToDate: any = new Date();
    let UnixToDate = moment().format('YYYY/MM/DD hh:mm:ss'); //当前时间 
    const CurTime = Date.parse(new Date(UnixToDate).toString());
    return CurTime;
  }
  // 随机生成字符串
  getRandomString(len?): any {
    len = len || 32;
    const chars = "ABCDEFGHIJKMLNOPQRSTUVWXYZabcdefghijkmlnopqrstuvwxyz0123456789";
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  parseParam(param, key) {

    var paramStr = "";

    if (param instanceof String || param instanceof Number || param instanceof Boolean) {

      paramStr += "&" + key + "=" + encodeURIComponent(param.toString());

    } else {
      // param.forEach(element => {
      //   console.log(element);
      // });
      for (const k in param) {
        //  const value = key == null ? k : key + (param instanceof Array ? "[" + k + "]" : "." + k);
        // console.log(k, param[k]);
        // if (object.hasOwnProperty(key)) {
        //   const element = object[key];

        // }
        paramStr += '&' + k + '=' + param[k];
      }

      // $.each(param, function (i) {

      //   vark = key == null ? i : key + (paraminstanceof Array ? "[" + i + "]" : "." + i);

      // paramStr += '&' + parseParam(this, k);

    }
    paramStr = paramStr == "" ? paramStr : '?' + paramStr.substr(1);
    console.log(paramStr);
    return paramStr;
  }
}
