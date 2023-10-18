import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../../core/_services/main.config';
import { uiDatePipe } from 'src/app/core/_pipes/date.pipe';
import { AlertService } from 'src/app/core/_services/shared/alert.service';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  providers: [uiDatePipe]
})
@PageTitle(['Account Settings'])
export class AccountSettingsComponent implements OnInit {

  updateForm: FormGroup;
  strongPassword = false;
  passMatch = false;

  constructor(
    private uiService: UIConfigService,
    private datePipe:uiDatePipe,
    private alert: AlertService,
    private gs: GlobalService,
    private router: Router
  ) {
    this.formInit()
  }

  ngOnInit(): void {

    this.initForm();

  }

  private formInit() {
    this.updateForm = new FormGroup({
      'name': new FormControl({value: '', disabled: true} ),
      'registeredSince': new FormControl({value: '', disabled: true} ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'oldpassword': new FormControl(),
      'newpassword': new FormControl([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ]),
      'confirmpass': new FormControl([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ]),
    });
  }

  onSubmit(){
    if (this.updateForm.valid) {
      this.gs.create(SERV.USERS,this.updateForm.value).subscribe(() => {
        this.alert.okAlert('User saved!','');
        this.router.navigate(['users/all-users']);
        }
      );
    }
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  onPasswordMatchChanged(event: boolean) {
    this.strongPassword = event;
  }

  private initForm() {
    this.gs.get(SERV.USERS,this.gs.userId, {'expand':'globalPermissionGroup'}).subscribe((result)=>{
    this.updateForm = new FormGroup({
      'name': new FormControl({value: result.globalPermissionGroup['name'], disabled: true} ),
      'registeredSince': new FormControl({value: this.datePipe.transform(result['registeredSince']), disabled: true} ),
      'email': new FormControl(result['email']),
      'oldpassword': new FormControl(),
      'newpassword': new FormControl(),
      'confirmpass': new FormControl(),
    });
  });
  }

}
