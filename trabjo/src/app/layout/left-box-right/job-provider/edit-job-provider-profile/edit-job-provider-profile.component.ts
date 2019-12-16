import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../../../../core/apiUrl';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { HttpService } from '../../../../services/http/http.service';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from '../../../../services/message/message.service';
@Component({
  selector: 'app-edit-job-provider-profile',
  templateUrl: './edit-job-provider-profile.component.html',
  styleUrls: ['./edit-job-provider-profile.component.css']
})
export class EditJobProviderProfileComponent implements OnInit {

  jobProviderProfileForm: FormGroup;
  states: any
  cities: any
  companyCities: any
  userData: any
  userDetails: any

  userObject: any
  constructor(private formBuild: FormBuilder, private http: HttpService, private users: UserService, private router: Router, private message: MessageService) {
    this.jobProviderProfile()
  }

  ngOnInit() {
    this.statesList()
    this.getUserDetails()
  }

  jobProviderProfile() {
    this.jobProviderProfileForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      address1: [''],
      organisationPart: [''],
      companyDesignation: [''],
      companyName: [''],
      companyPhoneNumber: [''],
      companyStateId: [''],
      companyCityId: [''],
      companyZipcode: [''],
      companyAddress: [''],
      companyAddress1: [''],
    });
  }

  statesList() {
    this.http.getData(ApiUrl.getStateList, {})
      .subscribe(response => {
        if (response && response.data)
          console.log("this is the response", response.data)
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

  getCompanyCities(stateId) {
    const obj = {
      stateId: stateId,
    };
    this.http.getData(ApiUrl.getCitiesList, obj)
      .subscribe(response => {
        if (response && response.data)
          this.companyCities = response.data
        console.log("the cities list data", this.companyCities)
      }, error => {
      });
  }
  

  getUserDetails() {
    this.userData = this.users.currentUserValue
    const obj = {
      userId: this.userData._id,
    };
    this.http.getData(ApiUrl.userListing, obj)
      .subscribe(response => {

        if (response && response.data)
        this.userDetails = response.data
        let userValueSet = {}
        if (this.userDetails.name) userValueSet['name'] = this.userDetails.name
        if (this.userDetails.email) userValueSet['email'] = this.userDetails.email
        if (this.userDetails.phoneNumber) userValueSet['phoneNumber'] = this.userDetails.phoneNumber
        this.userDetails.stateId ? userValueSet['stateId'] = this.userDetails.stateId._id : userValueSet['stateId'] = ""
        this.userDetails.cityId ? userValueSet['cityId'] = this.userDetails.cityId._id : userValueSet['cityId'] = ""
        this.userDetails.zipcode ? userValueSet['zipcode'] = this.userDetails.zipcode : userValueSet['zipcode'] = ""
        this.userDetails.address ? userValueSet['address'] = this.userDetails.address : userValueSet['address'] = ""
        this.userDetails.address1 ? userValueSet['address1'] = this.userDetails.address1 : userValueSet['address1'] = ""

        this.userDetails.organisationDetails.designation ? userValueSet['companyDesignation'] = this.userDetails.organisationDetails.designation : userValueSet['companyDesignation'] = ""
        this.userDetails.organisationDetails.name ? userValueSet['companyName'] = this.userDetails.organisationDetails.name : userValueSet['companyName'] = ""
        this.userDetails.organisationDetails.phoneNumber ? userValueSet['companyPhoneNumber'] = this.userDetails.organisationDetails.phoneNumber : userValueSet['companyPhoneNumber'] = ""
        this.userDetails.organisationDetails.stateId ? userValueSet['companyStateId'] = this.userDetails.organisationDetails.stateId._id : userValueSet['companyStateId'] = ""
        this.userDetails.organisationDetails.cityId ? userValueSet['companyCityId'] = this.userDetails.organisationDetails.cityId._id : userValueSet['companyCityId'] = ""
        this.userDetails.organisationDetails.zipcode ? userValueSet['companyZipcode'] = this.userDetails.organisationDetails.zipcode : userValueSet['companyZipcode'] = ""
        this.userDetails.organisationDetails.address ? userValueSet['companyAddress'] = this.userDetails.organisationDetails.address : userValueSet['companyAddress'] = ""
        this.userDetails.organisationDetails.address1 ? userValueSet['companyAddress1'] = this.userDetails.organisationDetails.address1 : userValueSet['companyAddress1'] = ""
        userValueSet['organisationPart'] = 1


        if(this.userDetails.stateId)this.getCities(this.userDetails.stateId._id)
        if(this.userDetails.organisationDetails.stateId)this.getCompanyCities(this.userDetails.organisationDetails.stateId._id)
        this.jobProviderProfileForm.setValue(userValueSet);

      }, error => {
      }
      );
  }

  updateProfile(valid, value): void {
    if (valid) {
      this.profileUpdate(value);
    } else {
      this.message.toast('warning', 'Complete the form before submitting!');
    }
  }

  profileUpdate(value) {
    this.http.postData(ApiUrl.updateProfile, value)
      .subscribe(response => {
        if(response.statusCode == 200){
          this.message.toast('success', 'Profile Updated Successfully!');
          this.router.navigate(['/job-provider-profile']);
        }
      }, error => {
      });
  }


}
