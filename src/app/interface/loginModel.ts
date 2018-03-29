import { RequestBase } from './requestBase';
import { environment } from '../../environments/environment';
export class LoginModel extends RequestBase {
  constructor() {
    super();
    this.s_domain_name = environment.s_domain_name;
  }
  s_login_account: string;
  s_paddword: string;
}
