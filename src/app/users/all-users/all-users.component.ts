import { faEdit, faHomeAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UIConfigService } from '../../core/_services/shared/storage.service';
import { UsersService } from '../../core/_services/users/users.service';
import { environment } from './../../../environments/environment';
import { PageTitle } from 'src/app/core/_decorators/autotitle';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html'
})
@PageTitle(['Show Users'])
export class AllUsersComponent  implements OnInit, OnDestroy {

  faHome=faHomeAlt;
  faTrash=faTrash;
  faEdit=faEdit;
  faPlus=faPlus;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public allusers: {
    id: number,
    name: string,
    registeredSince: number,
    lastLoginDate: number,
    email: string,
    isValid: number,
    sessionLifetime:number,
    rightGroupId: string,
    globalPermissionGroup: {
      name: string,
      permissions: string
    }
  }[] = [];

  constructor(
    private usersService: UsersService,
    private uiService: UIConfigService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {

    let params = {'maxResults': this.maxResults, 'expand': 'globalPermissionGroup' }
    this.usersService.getAllusers(params).subscribe((users: any) => {
      this.allusers = users.values;
      this.dtTrigger.next(void 0);
    });

    this.uidateformat = this.uiService.getUIsettings('timefmt').value;

    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
      responsive: true,
      buttons: {
        dom: {
          button: {
            className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
          }
        },
      buttons: [
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: [0, 1]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [0,1]
              },
              customize: function ( win ) {
                $(win.document.body)
                    .css( 'font-size', '10pt' )
                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
             }
            },
            {
              extend: 'csvHtml5',
              exportOptions: {modifier: {selected: true}},
              select: true,
              customize: function (dt, csv) {
                var data = "";
                for (var i = 0; i < dt.length; i++) {
                  data = "Agents\n\n"+  dt;
                }
                return data;
             }
            },
              'copy'
            ]
          }
        ],
      }
    };
  }

  editButtonClick(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  //ToDo
  onDelete(id: number){

  }




}

