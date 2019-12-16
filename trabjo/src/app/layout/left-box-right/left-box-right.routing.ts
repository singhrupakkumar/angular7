import { Routes } from '@angular/router';

// guards
import { LayoutGuard } from '../../services/guards/layout.guard';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JobProviderProfileComponent } from './job-provider/job-provider-profile/job-provider-profile.component';
import { JobSeekerProfileComponent } from './job-seeker/job-seeker-profile/job-seeker-profile.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { EditJobSeekerProfileComponent } from './job-seeker/edit-job-seeker-profile/edit-job-seeker-profile.component';
import { EditJobProviderProfileComponent } from './job-provider/edit-job-provider-profile/edit-job-provider-profile.component';
import { EditJobSeekerProfileDetailsComponent } from './job-seeker/edit-job-seeker-profile-details/edit-job-seeker-profile-details.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { AuthGuard } from 'src/app/services/guards/auth.guard';



export const leftBoxRightRouterConfig: Routes = [
    {
        path: '', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full', },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'job-post', component: JobPostComponent },
            { path: 'job-provider-profile', component: JobProviderProfileComponent },
            { path: 'job-seeker-profile', component: JobSeekerProfileComponent },
            { path: 'job-detail', component: JobDetailComponent },
            { path: 'edit-job-provider-profile', component: EditJobProviderProfileComponent },
            { path: 'edit-job-seeker-profile', component: EditJobSeekerProfileComponent },
            { path: 'edit-job-seeker-profile-details', component: EditJobSeekerProfileDetailsComponent },
            { path: 'my-jobs', component: MyJobsComponent },

        ]
    }
];
