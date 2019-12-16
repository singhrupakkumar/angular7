import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, data: { title: 'Login', breadcrumb: 'Login' }, canActivate: [AuthGuard] },
  { path: '', loadChildren: './layout/layout.module#LayoutModule', },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
