import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../sidebar/sidebar.module';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

import { leftBoxRightRouterConfig } from './left-box-right.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JobSeekerProfileComponent } from './job-seeker/job-seeker-profile/job-seeker-profile.component';
import { JobProviderProfileComponent } from './job-provider/job-provider-profile/job-provider-profile.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { EditJobSeekerProfileComponent } from './job-seeker/edit-job-seeker-profile/edit-job-seeker-profile.component';
import { EditJobProviderProfileComponent } from './job-provider/edit-job-provider-profile/edit-job-provider-profile.component';
import { EditJobSeekerProfileDetailsComponent } from './job-seeker/edit-job-seeker-profile-details/edit-job-seeker-profile-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import { MyJobsComponent } from './my-jobs/my-jobs.component';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent, JobPostComponent, JobSeekerProfileComponent, JobProviderProfileComponent, JobDetailComponent, EditJobSeekerProfileComponent, EditJobProviderProfileComponent, EditJobSeekerProfileDetailsComponent, MyJobsComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    RouterModule.forChild(leftBoxRightRouterConfig)
  ]
})
export class LeftBoxRightModule { }
