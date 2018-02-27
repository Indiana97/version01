import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../company.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  companyForm: FormGroup;
  processing: boolean = false;
  title: string;
  company = new Company();

  constructor(private _fb: FormBuilder,
              private _companyService: CompanyService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _toastr: ToastrService) {
  }

  ngOnInit() {
    this.initForm();

    let id;
    this._route.params.subscribe(params => {
      id = params.id;
      if (!id) {
        return;
      }
      this._companyService
        .getCompany(id)
        .subscribe(company => {
          this.company = company;
          this.companyForm.patchValue({
            name: company.name,
            address: company.address,
            city: company.city
          })

        }, err => {
         this.handleError(err);
        })
    });

    this.title = id ? 'Edit Company' : 'Add Company';

  }

  submitForm() {

    let result;
    if (this.companyForm.valid) {
      let companyParams = {
        name: this.companyForm.get('name').value,
        city: this.companyForm.get('city').value,
        address: this.companyForm.get('address').value,
      };

      this.processing = true;
      if (this.company._id) {
        result = this._companyService.updateCompany(this.company._id, companyParams);
      } else {
        result = this._companyService.createCompany(companyParams);
      }
      result.subscribe(rsp => {
        console.log(rsp);
        this.processing = false;
        this._router.navigate(['companies']);
      }, err => {
        this.processing = false;
        this.handleError(err);
        return;
      })
    }
  }

  cancel() {
    this.companyForm.reset();
    this._router.navigate(['companies']);
  }

  private initForm() {
    this.companyForm = this._fb.group({
      name: ['', Validators.required],
      city: '',
      address: ''
    });
  }
  private handleError(err) {
    console.log(err);
    this._toastr.error('could not process request', 'Ops!');

  }


}
