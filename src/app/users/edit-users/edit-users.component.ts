import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/_services/users/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar,faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { User } from '../user.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html'
})
export class EditUsersComponent implements OnInit {
  faCalendar=faCalendar;
  faLock=faLock;
  faUser=faUser;
  faEnvelope=faEnvelope;
  isLoading = false;

  // We need to access groups using the API
  groups = ['Admin', 'Standard User'];
  // We need an array uf user names, so we do not create a duplicate name.
  usedUserNames = ['Admin', 'Guest'];

  user: any[];

  updateForm: FormGroup;  // We need to add validation to the form

  allowEdit = false;

  constructor(private usersService: UsersService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.queryParams); // We can use this for authentification
    // this.route.queryParams.subscribe();

    // this.route.queryParams
    //   .subscribe(
    //     // (queryParams: Params) => {
    //     //   this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    //     // }
    //   )

    this.updateForm = new FormGroup({
      'rightGroup': new FormControl(null),
      'setPassword': new FormControl(null),
      'isValid': new FormControl(true || null)
    });

    this.isLoading = true;

    const id = +this.route.snapshot.params['id'];
    this.usersService.getUser(id).subscribe((user: any) => {
      this.user = user;
      this.isLoading = false;
      console.log(this.user);
    });

    // This options bind the params in the same (it is a better option but depends on the API structure)
    // const id = +this.route.snapshot.params['id'];
    // this.userdata = this.usersService.getUser(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.usersService.getUser(params['id']);
    //     }
    //   );
}
  onUpdateUser(index: number): void{
    if (this.updateForm.valid) {
      console.log(this.updateForm);
      this.updateForm.reset();
  }
  }

  onDelete(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it cannot be recover.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe(() => {
          Swal.fire(
            "Users has been deleted!",
            {
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        });
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'No worries, your User is safe!',
          'error'
        )
      }
    });
  }

  checkUserNameExist(control: FormControl): {[s: string]: boolean}{
    if(this.usedUserNames.indexOf(control.value) !== -1){
      return {'nameIsUsed': true};
    }
    return null as any;
  }

}
