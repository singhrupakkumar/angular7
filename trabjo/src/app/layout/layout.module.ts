import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared module
// import { SharedModuleModule } from '../shared/shared-module/shared-module.module';

// routing
import { RouterModule } from '@angular/router';
import { layoutRouterConfig } from './layout.routing';

// components
// import { SideBarComponent } from './common/side-bar/side-bar.component';
import { HeaderComponent } from './common/header/header.component';
import { LayoutComponent } from './layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './common/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterJobseekerComponent } from './register-jobseeker/register-jobseeker.component';
import { RegisterJobproviderComponent } from './register-jobprovider/register-jobprovider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermsNConditionsComponent } from './terms-n-conditions/terms-n-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomepageComponent,
    FooterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    RegisterJobseekerComponent,
    RegisterJobproviderComponent,
    TermsNConditionsComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(layoutRouterConfig)
  ]
})
export class LayoutModule { }
