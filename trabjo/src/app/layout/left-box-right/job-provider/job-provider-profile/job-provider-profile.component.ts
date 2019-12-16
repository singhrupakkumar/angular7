import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../../../../core/apiUrl';

import { HttpService } from '../../../../services/http/http.service';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from '../../../../services/message/message.service';
@Component({
  selector: 'app-job-provider-profile',
  templateUrl: './job-provider-profile.component.html',
  styleUrls: ['./job-provider-profile.component.css']
})
export class JobProviderProfileComponent implements OnInit {

  userData: any
  userDetails: any
  constructor(private http: HttpService,private users: UserService, private router: Router,private message: MessageService) { }

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
      }, error => {
      }
    );
  }

}
