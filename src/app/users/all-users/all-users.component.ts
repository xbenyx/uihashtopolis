import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../service/users/users.service';
import { faEdit,faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html'
})
export class AllUsersComponent  implements OnInit, OnDestroy {
  faEdit=faEdit;
  faHome=faHomeAlt;
  faPlus=faPlus;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public allusers: {userId: number, username: string, registered: number, lastLogin: number, email: string, isValid: number, sessionLifetime:number, rightGroupId: string}[] = [];

  public test:any  = [];

  constructor(private usersService: UsersService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.usersService.getAllusers().subscribe((users: any) => {
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

