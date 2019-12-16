import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiUrl } from '../../core/apiUrl';

import { HttpService } from '../../services/http/http.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-register-jobseeker',
  templateUrl: './register-jobseeker.component.html',
  styleUrls: ['./register-jobseeker.component.css']
})
export class RegisterJobseekerComponent implements OnInit {

  form: FormGroup;
  show = false;

  constructor(private formBuild: FormBuilder, private http: HttpService, private router: Router,private message: MessageService) {
    this.jobseekerSignupForm();
  }

  ngOnInit() {
  }

  jobseekerSignupForm() {
    this.form = this.formBuild.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required]],
      'phoneNumber': ['', [Validators.required]],
      'password': ['', Validators.required],
      'confirmPass': ['', Validators.required],
      'experienced': ['', Validators.required],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  signUp(valid, value){
    
    let obj = value
    obj.phoneNumber = parseInt(obj.phoneNumber)
    obj.type = "EMPLOYEE"
    delete obj.confirmPass
    obj.experienced == "1" ? obj.experienced = true : obj.experienced = false 
    console.log("obj obj",obj)
    this.http.postData(ApiUrl.userRegisteration, obj)
      .subscribe(response => {
        console.log("responseresponse>",response)
        if(response.statusCode == 200){
          this.message.toast('success', 'You are registered Successfully!');
          this.router.navigate(['/login']);
        }    
      }, error => {
        console.log("errorerror",error)
      });
  }
}
