import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[] = [
    new User('Test','benito@gmail.com', 2)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
