import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../sidebar/sidebar.module';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

import { boxRightRouterConfig } from './box-right.routing';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(boxRightRouterConfig)
  ]
})
export class BoxRightModule { }
