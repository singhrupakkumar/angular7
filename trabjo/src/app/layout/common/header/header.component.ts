import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private users: UserService,) { }

  userData : any
  userSubscription: Subscription;
  isLogedIn = false
  isSeeker = false
  isProvider = false
  ngOnInit() {
    this.userSubscription = this.users.currentUser
    .subscribe(response => {
      console.log("responseresponse",response)
      if(response && response.accessToken){
        this.isLogedIn = true
        if(response.accountType == "EMPLOYEE"){
          this.isSeeker = true
          this.isProvider = false
        }else if(response.accountType == "EMPLOYER"){
          this.isProvider = true
          this.isSeeker = false
        }
      }else{
        this.isProvider = false
        this.isSeeker = false
        this.isLogedIn = false
      }
    }, error => {
    });
  }

  signout() {
    this.users.userSignOut()
    
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
