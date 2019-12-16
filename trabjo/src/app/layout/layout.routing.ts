import { Routes } from '@angular/router';

// guards
import { LayoutGuard } from '../services/guards/layout.guard';

// components
import { LayoutComponent } from './layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterJobproviderComponent } from './register-jobprovider/register-jobprovider.component';
import { RegisterJobseekerComponent } from './register-jobseeker/register-jobseeker.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsNConditionsComponent } from './terms-n-conditions/terms-n-conditions.component';
// import { SubLayoutComponent } from './sub-layout/sub-layout.component';

export const layoutRouterConfig: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full', canActivate: [LayoutGuard] },
      {
        path: 'homepage', component: HomepageComponent,
      },
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'forget-password', component: ForgetPasswordComponent,
      },
      {
        path: 'reset-password', component: ResetPasswordComponent,
      },
      {
        path: 'register-jobseeker', component: RegisterJobseekerComponent,
      },
      {
        path: 'register-jobprovider', component: RegisterJobproviderComponent,
      },
      {
        path: 'privacy-policy', component: PrivacyPolicyComponent,
      },
      {
        path: 'terms-n-conditions', component: TermsNConditionsComponent,
      },
      {
        path: 'contact-us', component: ContactUsComponent,
      },
      { path: '', loadChildren: './box-right/box-right.module#BoxRightModule', },
      { path: '', loadChildren: './left-box-right/left-box-right.module#LeftBoxRightModule', },
    ]
  }
];
