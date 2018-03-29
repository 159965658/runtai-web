
import { FormControl, FormGroup } from '@angular/forms';
/**
 * 自定义验证器(其实就是一个函数,一个返回任意对象的函数)
 * 传递的参数是当前需要验证的表单的FormControl
 * 通过传递的参数获取当前表单输入的值
 */
export function passWordValidator(control: FormControl): any {
   // console.log(control.get('np'));
    // 获取密码输入框的值
    const pass1 = control.get('np').value as FormControl;
    const pass2 = control.get('anp').value as FormControl;
   // console.log('你输入的值:', pass1, pass2);
    const isEqule: boolean = (pass1 === pass2); 
    return isEqule ? null : { passValidator: { info: '两次密码不一致' } };
}