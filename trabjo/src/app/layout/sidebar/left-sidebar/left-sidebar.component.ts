import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor(private users: UserService,) { }

  userData : any
  isLogedIn = false
  isSeeker = false
  isProvider = false
  ngOnInit() {
    this.users.currentUser
    .subscribe(response => {
      if(response && response.accessToken){
        this.isLogedIn = true
        this.userData = response
        if(response.accountType == "EMPLOYEE"){
          this.isSeeker = true
          this.isProvider = false
        }else if(response.accountType == "EMPLOYER"){
          this.isProvider = true
          this.isSeeker = false
        }
      }
    }, error => {
    });
  }
}
