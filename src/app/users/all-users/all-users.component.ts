import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../core/_services/users/users.service';
import { faEdit,faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';


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

  public allusers: {
    userId: number,
    username: string,
    registeredSince: number,
    lastLoginDate: number,
    email: string,
    isValid: number,
    sessionLifetime:number,
    rightGroupId: string,
    rightGroup: {
      groupName: string,
      permissions: string
    }
  }[] = [];

  public test:any  = [];

  constructor(private usersService: UsersService,
    private route:ActivatedRoute,private router:Router) { }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {
    let params = {'maxResults': this.maxResults, 'expand': 'rightGroup' }
    this.usersService.getAllusers(params).subscribe((users: any) => {
      this.allusers = users.values;
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

