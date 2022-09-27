import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  allUsersTable = [
    {
      userId: 1,
      username: 'Ben',
      registeredSince: '13.09.2022, 15:29:19',
      lastLoginDate: '27.09.2022, 14:52:40',
      email: 'test@gmail.com',
      isValid: 'Valid',
      sessionLifetime: '3600',
      rightGroupId: 'Admin'
    },
    {
      userId: 2,
      username: 'Beni',
      registeredSince: '13.09.2022, 15:29:19',
      lastLoginDate: '27.09.2022, 14:52:40',
      email: 'test@gmail.com',
      isValid: 'Valid',
      sessionLifetime: '3600',
      rightGroupId: 'Admin'
    }
  ];

  users(): void {
    this.allUsersTable
          this.dtTrigger;
  }

  numUsers = this.allUsersTable.length;
}

