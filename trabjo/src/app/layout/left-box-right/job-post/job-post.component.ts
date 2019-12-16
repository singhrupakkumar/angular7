import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiUrl } from '../../../core/apiUrl';

import { HttpService } from '../../../services/http/http.service';
import { UserService } from '../../../services/user/user.service';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {

  jobPostForm: FormGroup;
  industriesListData : any
  jobRoleListData : any
  constructor(private formBuild: FormBuilder, private http: HttpService,private users: UserService, private router: Router,private message: MessageService) { 
    this.jobForm()
  }

  ngOnInit() {
    this.industriesList()
  }

  jobForm() {
    this.jobPostForm = this.formBuild.group({
      'industryId': ['', [Validators.required]],
      'jobRoleId': ['', [Validators.required]],
      'jobType': ['', [Validators.required]],
      'salary': ['', [Validators.required]],
      'englishLevel': ['', [Validators.required]],
      'vrfy': ['', [Validators.required]],
      'hours': ['', [Validators.required]],
      'exp': ['', [Validators.required]],
      'vacanciesNumber': ['', [Validators.required]],
      'sDate': ['', [Validators.required]],
      'eDate': ['', [Validators.required]],
      'location': ['', [Validators.required]],
      'skills': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'spanishTranslationNeeded': ['', [Validators.required]],
    });
  }

  industriesList() {
    this.http.getData(ApiUrl.industriesList, {})
      .subscribe(response => {
        if(response && response.data)
        this.industriesListData = response.data
      }, error => {
      });
  }

  jobRoles(industryId){
    const obj = {
      industryId: industryId,
    };
    this.http.getData(ApiUrl.jobRoleList, obj)
      .subscribe(response => {
        if(response && response.data)
        this.jobRoleListData = response.data
      }, error => {
      });
  }

  postJob(valid, value): void{
    console.log("valuevalue",value)
    console.log("validvalid",valid)
    
    if (valid) {
      this.postCreating(value);
    }else{
      this.message.toast('warning', 'Complete the form before submitting!');
    }
  }

  postCreating(value){
    value['startDate'] = new Date(value.sDate).getTime()
    value['endDate'] = new Date(value.eDate).getTime()
    value.vrfy == "1" ?value['verify'] = true : value['verify'] = false
    value.exp == "1" ?value['experience'] = true : value['experience'] = false

    const obj = value
    delete obj.sDate
    delete obj.eDate
    delete obj.vrfy
    delete obj.exp
    this.http.postData(ApiUrl.jobPosting, value)
      .subscribe(response => {
        console.log("responseresponse",response)
        if(response.statusCode == 200){
          this.message.toast('success', 'Job Posted Successfully!');
          this.router.navigate(['/dashboard']);
        }
        
      }, error => {
      });
  }

}
