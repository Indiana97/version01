import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CompanyListComponent} from './companies/company-list/company-list.component';
import {HttpClientModule} from "@angular/common/http";
import {CompanyService} from "./companies/company.service";
import {RouterModule, Routes} from "@angular/router";
import {NavbarComponent} from './navbar/navbar.component';
import {CompanyFormComponent} from "./companies/company-form/company-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [{
  path: 'companies',
  component: CompanyListComponent
},{
  path: 'companies/new',
  component: CompanyFormComponent
},{
  path : 'companies/:id',
  component: CompanyFormComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    NavbarComponent,
    CompanyFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
