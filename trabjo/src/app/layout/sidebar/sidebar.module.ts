import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab


@NgModule({
  declarations: [RightSidebarComponent, LeftSidebarComponent],
  imports: [
    CommonModule,
    AccordionModule
  ],
  exports: [
    RightSidebarComponent,
    LeftSidebarComponent
  ]
})
export class SidebarModule { }
