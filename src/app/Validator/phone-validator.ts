
import { FormControl, FormGroup } from '@angular/forms';
/**
 * 自定义验证器(其实就是一个函数,一个返回任意对象的函数)
 * 传递的参数是当前需要验证的表单的FormControl
 * 通过传递的参数获取当前表单输入的值
 */
export function PhoneValidator(control: FormControl): any {
    // console.log(control.get('np'));
    // 获取密码输入框的值 
    const phone = control.value;

    // console.log('你输入的值:', pass1, pass2); 
    // return isEqule ? null : { passValidator: { info: '两次密码不一致' } };
    let re = /^1[3|4|5|6|7|8|9]\d{9}$/;
    return re.test(phone) ? null : { msg: { info: '手机号输入不正确' } };
}