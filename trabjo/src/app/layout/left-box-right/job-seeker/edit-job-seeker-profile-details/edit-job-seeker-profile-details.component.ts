import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../../../../core/apiUrl';
import { Validators, FormGroup, FormArray,FormBuilder } from '@angular/forms';

import { HttpService } from '../../../../services/http/http.service';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from '../../../../services/message/message.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-edit-job-seeker-profile-details',
  templateUrl: './edit-job-seeker-profile-details.component.html',
  styleUrls: ['./edit-job-seeker-profile-details.component.css']
})
export class EditJobSeekerProfileDetailsComponent implements OnInit {

  jobSeekerProfilePersonalForm: FormGroup;
  jobSeekerProfileExperienceForm: FormGroup;
  experiences: FormArray;
  userData: any
  userDetails: any
  states: any
  cities: any

  constructor(private formBuild: FormBuilder, private http: HttpService,private users: UserService, private router: Router,private message: MessageService) {
    this.jobProviderPersonalProfile()
    this.jobProviderExperienceProfile()
  }

  ngOnInit() {
    this.statesList()
    this.getUserDetails()
  }

  jobProviderPersonalProfile() {
    this.jobSeekerProfilePersonalForm = this.formBuild.group({
      dob: [''],
      address: [''],
      stateId: [''],
      cityId: [''],
      zipcode: [''],
    });
  }

  jobProviderExperienceProfile() {
    this.jobSeekerProfileExperienceForm = this.formBuild.group({
      skills: [''],
      experiences : this.formBuild.array([ this.createExperience() ]),
      resume: [''],
      salary: [''],
      referenceName1: [''],
      referenceEmail1: [''],
      referenceName2: [''],
      referenceEmail2: [''],
    });
  }

  createExperience(): FormGroup {
    return this.formBuild.group({
      position: [''],
      companyName: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
    });
  }

  get experienceData() {
    return this.jobSeekerProfileExperienceForm.get('experiences') as FormArray;
  }

  addExperience(data?){
    const formgroup : FormGroup = this.formBuild.group({
      position: [''],
      companyName: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
    });

    if(data){
      formgroup.get("position").patchValue(data.position)
      formgroup.get("companyName").patchValue(data.companyName)
      formgroup.get("startDate").patchValue(new Date(data.startDate))
      formgroup.get("endDate").patchValue(new Date(data.endDate))
      formgroup.get("description").patchValue(data.description)
    }
    this.experienceData.push(formgroup);
  }

  deleteExperience(index) {
    this.experienceData.removeAt(index);
  }

  getUserDetails() {
    this.userData = this.users.currentUserValue
    const obj = {
      userId : this.userData._id,
    };
    this.http.getData(ApiUrl.userListing, obj)
      .subscribe(response => {
        if(response && response.data)
        this.userDetails = response.data
        let userPersonalValue = {}
        let userExpValue = {}

        //Personal Details Populate
        if (this.userDetails.dob) userPersonalValue['dob'] = new Date(this.userDetails.dob)
        if (this.userDetails.address) userPersonalValue['address'] = this.userDetails.address
        this.userDetails.stateId ? userPersonalValue['stateId'] = this.userDetails.stateId._id : userPersonalValue['stateId'] = ""
        this.userDetails.cityId ? userPersonalValue['cityId'] = this.userDetails.cityId._id : userPersonalValue['cityId'] = ""
        this.userDetails.zipcode ? userPersonalValue['zipcode'] = this.userDetails.zipcode : userPersonalValue['zipcode'] = ""
        if(this.userDetails.stateId)this.getCities(this.userDetails.stateId._id)
        this.jobSeekerProfilePersonalForm.patchValue(userPersonalValue);

        //Experience Details Populate
        this.userDetails.skills ? userExpValue['skills'] = this.userDetails.skills : userExpValue['skills'] = ""
        if(this.userDetails.experienceData.length > 0 ){        
          while(this.experienceData.length){
            this.experienceData.removeAt(0);
          }
          this.userDetails.experienceData.forEach(element => {
            this.addExperience(element)     
          });
        }
        this.userDetails.resume ? userExpValue['resume'] = this.userDetails.resume : userExpValue['resume'] = ""
        this.userDetails.salary ? userExpValue['salary'] = this.userDetails.salary : userExpValue['salary'] = ""
        this.userDetails.referenceName1 ? userExpValue['referenceName1'] = this.userDetails.referenceName1 : userExpValue['referenceName1'] = ""
        this.userDetails.referenceEmail1 ? userExpValue['referenceEmail1'] = this.userDetails.referenceEmail1 : userExpValue['referenceEmail1'] = ""
        this.userDetails.referenceEmail2 ? userExpValue['referenceEmail2'] = this.userDetails.referenceEmail2 : userExpValue['referenceEmail2'] = ""
        
        this.userDetails.referenceName2 ? userExpValue['referenceName2'] = this.userDetails.referenceName2 : userExpValue['referenceName2'] = ""

        this.jobSeekerProfileExperienceForm.patchValue(userExpValue);
      }, error => {
      }
    );
  }

  statesList() {
    this.http.getData(ApiUrl.getStateList, {})
      .subscribe(response => {
        if (response && response.data)
        this.states = response.data
      }, error => {
      });
  }

  getCities(stateId) {
    const obj = {
      stateId: stateId,
    };
    this.http.getData(ApiUrl.getCitiesList, obj)
      .subscribe(response => {
        if (response && response.data)
          this.cities = response.data
        console.log("the cities list data", this.cities)
      }, error => {
      });
  }

  updatePersonalProfile(valid, value): void {
    if (valid) {
      this.profilePersonalUpdate(value);
    } else {
      this.message.toast('warning', 'Complete the form before submitting!');
    }
  }

  updateExperienceProfile(valid, value): void {
    if (valid) {
      this.profileExperienceUpdate(value);
    } else {
      this.message.toast('warning', 'Complete the form before submitting!');
    }
  }


  profilePersonalUpdate(value){
    const obj = value
    obj['dob'] = new Date(obj.dob).getTime()

    this.http.postData(ApiUrl.updateProfile, value)
      .subscribe(response => {
        if(response.statusCode == 200){
          this.message.toast('success', 'Profile Updated Successfully!');
        }
        
      }, error => {
      });

  }

  profileExperienceUpdate(value){

    value.experiences.map(function(part, index, theArray){
      part.endDate = new Date(part.endDate).getTime()
      part.startDate = new Date(part.startDate).getTime()
    })


    if(value.resume && value.resume.length <= 0){
      delete value.resume
    }

    this.http.postData(ApiUrl.addUserExperiences, value)
      .subscribe(response => {
        if(response.statusCode == 200){
          this.message.toast('success', 'Profile Updated Successfully!');
          this.router.navigate(['/job-seeker-profile']);
        }

      }, error => {
      });
  }


  

}
