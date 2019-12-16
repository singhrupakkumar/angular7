import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../../../core/apiUrl';
import { PaginationControls } from 'src/app/shared/models/pagination-model';

import { HttpService } from '../../../services/http/http.service';
import { UserService } from '../../../services/user/user.service';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobList : any
  pageControl = new PaginationControls();

  constructor( private http: HttpService,private users: UserService, private router: Router,private message: MessageService) { }

  ngOnInit() {
    this.myJobLists()
  }

  myJobLists(){
    const obj = {
      type : 1,
      skip : this.pageControl.skip,
      limit : this.pageControl.limit
    };
    console.log("objobj",obj)
    this.http.getData(ApiUrl.jobListing, obj)
      .subscribe(response => {
        console.log("respinse data",response)
        if(response && response.data)
        this.jobList = response.data.list
        this.pageControl.count = response.data.count;
        // this.pageControl.skip = (this.pageControl.page - 1) * this.pageControl.limit;
      }, error => {
      }
    );
  }

}
