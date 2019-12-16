import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiUrl } from '../../core/apiUrl';

import { HttpService } from '../../services/http/http.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-register-jobprovider',
  templateUrl: './register-jobprovider.component.html',
  styleUrls: ['./register-jobprovider.component.css']
})
export class RegisterJobproviderComponent implements OnInit {

  form: FormGroup;
  show = false;

  constructor(private formBuild: FormBuilder, private http: HttpService, private router: Router,private message: MessageService) {
    this.jobproviderSignupForm();
  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  jobproviderSignupForm(){
    this.form = this.formBuild.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required]],
      'phoneNumber': ['', [Validators.required]],
      'password': ['', Validators.required],
      'confirmPass': ['', Validators.required],
    }, { validator: this.checkPasswords });
  }


  signUp(valid, value){
    
    let obj = value
    obj.phoneNumber = parseInt(obj.phoneNumber)
    obj.type = "EMPLOYER"
    delete obj.confirmPass
    obj.experienced = false 
    console.log("obj obj",obj)
    this.http.postData(ApiUrl.userRegisteration, obj)
      .subscribe(response => {
        console.log("responseresponse>",response)
        if(response.statusCode == 200){
          this.message.toast('success', 'You are registered Successfully!');
          this.router.navigate(['/login']);
        }else if(response.statusCode == 400){
          this.message.toast('error', response.message);
        }else{
          this.message.toast('error', response.message);
        }      
      }, error => {
      });
  }

}
