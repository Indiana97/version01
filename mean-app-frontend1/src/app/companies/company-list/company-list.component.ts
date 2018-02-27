import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../company.service";
import {Company} from "../company.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor(private _companyService: CompanyService,
              private _toastr: ToastrService) {

  }

  ngOnInit() {
    this._companyService
      .getCompanies()
      .subscribe(companies => {
        this.companies = companies;
        console.log(this.companies);
      }, err => {
        this.handleError(err);
      })
  }

  deleteCompany(company: Company) {

    if (confirm(`Do you want to delete the ${company.name}`)) {

      let index = this.companies.indexOf(company);
      this.companies.splice(index, 1);
      this._companyService
        .deleteCompany(company._id)
        .subscribe(rsp => {
          console.log(rsp);
          this._toastr.success('company has deleted','success');
        }, err => {
          this.companies.splice(index, 0, company);
          console.log(err);
        })
    }
  }

  private handleError(err) {
    console.log(err);
    this._toastr.error('could not process request', 'Ops!');

  }
}
