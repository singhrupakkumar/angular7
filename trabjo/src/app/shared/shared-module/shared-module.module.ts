import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// directives
// import { NumberOnlyDirective } from '../directives/number-only.directive';
// import { GoogleplaceDirective } from '../directives/googleplace.directive';
// import { BlockCopyPasteDirective } from '../directives/block-copy-paste.directive';
// import { AmountDirective } from '../directives/amount.directive';

// modules
import { TrimValueAccessorModule } from 'ng-trim-value-accessor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// components
import { NoRecordComponent } from '../../layout/common/no-record/no-record.component';

@NgModule({
  declarations: [
    // AmountDirective,
    // BlockCopyPasteDirective,
    // GoogleplaceDirective,
    // NumberOnlyDirective,
    NoRecordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TrimValueAccessorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ChartsModule,
    NgbModule,
    NgxPaginationModule,
    // AngularMultiSelectModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    TrimValueAccessorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ChartsModule,
    NgbModule,
    NoRecordComponent,
    // AmountDirective,
    // BlockCopyPasteDirective,
    // GoogleplaceDirective,
    // NumberOnlyDirective,
    NgxPaginationModule,
    // AngularMultiSelectModule,
    RouterModule,
    BsDatepickerModule
  ]
})
export class SharedModuleModule { }
