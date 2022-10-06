import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../service/users/users.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent  implements OnInit, OnDestroy {
  faEdit=faEdit;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public allusers: {userId: number, username: string, registeredSince: number, lastLoginDate: number, email: string, isValid: number, sessionLifetime:number, rightGroupId: string}[] = [];

  constructor(private usersService: UsersService,
    private route:ActivatedRoute,private router:Router) { }

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
      buttons: ['copy', 'excel', 'csv', 'edit']
    };
  }

  editButtonClick(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}

