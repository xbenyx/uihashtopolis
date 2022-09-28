import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../service/users/users.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent  implements OnInit, OnDestroy {
  faEdit=faEdit;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  allusers: any = [];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.users().subscribe((users: any) => {
      this.allusers = users;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
      buttons: [
        'copy', 'excel', 'csv', 'edit'
    ]
    };
  }
}

