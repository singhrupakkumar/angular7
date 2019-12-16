import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiUrl } from '../../core/apiUrl';

import { HttpService } from '../../services/http/http.service';
import { UserService } from '../../services/user/user.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  show = false;

  constructor(private formBuild: FormBuilder, private http: HttpService,private users: UserService, private router: Router,private message: MessageService) {
    this.loginForm();
  }

  ngOnInit() { }

  loginForm() {
    this.form = this.formBuild.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  signIn(valid, value): void {
    this.show = true;
    if (valid) {
      this.login(value);
    }
  }

  login(value) {
    console.log("value dayta",value)
    this.http.postData(ApiUrl.login, value)
      .subscribe(response => {
        if(response.data.isRegister == true){
          this.users.setUserLocalData(response.data)
          if(response.data.accountType == "EMPLOYEE"){
            this.router.navigate(['/job-seeker-profile']);
          }else {
            this.router.navigate(['/job-provider-profile']);
          }
        }else{
          this.message.toast('error', 'You are not registered!');
        }
        
        
      }, error => {
      });
  }

}
