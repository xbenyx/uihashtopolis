import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  user: any[];

  updateForm: FormGroup;

  constructor(private usersService: UsersService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.queryParams); // We can use this for authentification
    // this.route.queryParams.subscribe();
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
onUpdateUser(){

}
}
