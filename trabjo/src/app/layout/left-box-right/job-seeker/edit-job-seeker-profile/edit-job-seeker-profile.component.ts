import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../../../../core/apiUrl';

import { HttpService } from '../../../../services/http/http.service';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from '../../../../services/message/message.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-job-seeker-profile',
  templateUrl: './edit-job-seeker-profile.component.html',
  styleUrls: ['./edit-job-seeker-profile.component.css']
})
export class EditJobSeekerProfileComponent implements OnInit {

  userData: any
  userDetails: any
  jobSeekerBasicProfileForm: FormGroup;

  constructor(private formBuild: FormBuilder, private http: HttpService,private users: UserService, private router: Router,private message: MessageService) {
    this.jobSeekerBasicProfile()
  }

  ngOnInit() {
    this.getUserDetails()
  }

  getUserDetails() {
    this.userData = this.users.currentUserValue
    const obj = {
      userId : this.userData._id,
    };
    this.http.getData(ApiUrl.userListing, obj)
      .subscribe(response => {
        console.log("respinse data",response)
        if(response && response.data)
        this.userDetails = response.data
        let userValueSet = {}
        if (this.userDetails.name) userValueSet['name'] = this.userDetails.name
        if (this.userDetails.email) userValueSet['email'] = this.userDetails.email
        if (this.userDetails.phoneNumber) userValueSet['phoneNumber'] = this.userDetails.phoneNumber
        this.userDetails.experienced == true ? userValueSet['experienced'] = 1 : userValueSet['experienced'] = 0

        this.jobSeekerBasicProfileForm.setValue(userValueSet);
      }, error => {
      }
    );
  }
  jobSeekerBasicProfile(){
    this.jobSeekerBasicProfileForm = this.formBuild.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      experienced: ['', [Validators.required]],
    });
  }

  updateProfile(valid, value): void {
    if (valid) {
      this.profileUpdate(value);
    } else {
      this.message.toast('warning', 'Complete the form before submitting!');
    }
  }

  profileUpdate(value) {
    console.log("valuevalue", value)
    let obj = value
    obj.experienced == "1" ? obj.experienced = true : obj.experienced = false 
    this.http.postData(ApiUrl.updateProfile, value)
      .subscribe(response => {
        console.log("responseresponse",response)
        if(response.statusCode == 200){
          this.message.toast('success', 'Profile Updated Successfully!');
          this.router.navigate(['/job-seeker-profile']);
        }

      }, error => {
      });
  }

}
