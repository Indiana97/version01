import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot()
  ],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent,
    ToastrModule]
})
export class SharedModule {
}
