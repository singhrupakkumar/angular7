import { Routes } from '@angular/router';

// guards
import { LayoutGuard } from '../../services/guards/layout.guard';
import { LayoutComponent } from './layout.component';

// import { SubLayoutComponent } from './sub-layout/sub-layout.component';

export const boxRightRouterConfig: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard1', pathMatch: 'full', canActivate: [LayoutGuard] },
      
    ]
  }
];
