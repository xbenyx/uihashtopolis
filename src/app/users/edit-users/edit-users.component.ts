import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

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

    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      )

    const id = +this.route.snapshot.params['id'];
    this.usersService.getUser(id).subscribe((user: any) => {
      this.user = user;
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

  deleteUser(index: number){
      this.updateForm.reset();
  }

  checkUserNameExist(control: FormControl): {[s: string]: boolean}{
    if(this.usedUserNames.indexOf(control.value) !== -1){
      return {'nameIsUsed': true};
    }
    return null as any;
  }

}
