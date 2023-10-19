import { faEdit, faTrash, faLock, faFileImport, faFileExport, faArchive, faPlus, faHomeAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { environment } from './../../../environments/environment';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../core/_services/main.config';

declare let $:any;

@Component({
  selector: 'app-hashlist',
  templateUrl: './hashlist.component.html'
})
@PageTitle(['Show Hashlists'])
export class HashlistComponent implements OnInit, OnDestroy {

  faCheckCircle=faCheckCircle;
  faFileImport=faFileImport;
  faFileExport=faFileExport;
  faArchive=faArchive;
  faHome=faHomeAlt;
  faTrash=faTrash;
  faLock=faLock;
  faPlus=faPlus;
  faEdit=faEdit;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public allhashlists: {
    hashlistId: number,
    name: string,
    format: number,
    hashTypeId: number,
    hashCount: number,
    saltSeparator: string,
    cracked: number,
    isSecret: boolean,
    isHexSalt: string,
    isSalted: string,
    accessGroupId: number,
    notes: string,
    useBrain: number,
    brainFeatures: number,
    isArchived: string,
    accessGroup: {accessGroupId: number, groupName: string}
    hashType: {description: string, hashTypeId: number, isSalted: string, isSlowHash: string}
  }[] = []; // Should be in models, Todo when data structure is confirmed

  constructor(
    private route:ActivatedRoute,
    private alert: AlertService,
    private gs: GlobalService,
    private router: Router
    ) { }

  isArchived: boolean;
  whichView: string;

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'hashlist':
          this.whichView = 'live';
          this.isArchived = false;
        break;

        case 'archived':
          this.whichView = 'archived';
          this.isArchived = true;
        break;

      }

    const params = {'maxResults': this.maxResults, 'expand': 'hashType,accessGroup', 'filter': 'isArchived='+this.isArchived+''}

    this.gs.getAll(SERV.HASHLISTS,params).subscribe((list: any) => {
      this.allhashlists = list.values.filter(u=> u.format != 3); // Exclude superhashlists
      this.dtTrigger.next(void 0);
    });

    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      scrollX: true,
      pageLength: 25,
      lengthMenu: [
          [10, 25, 50, 100, 250, -1],
          [10, 25, 50, 100, 250, 'All']
      ],
      stateSave: true,
      select: {
        style: 'multi',
      },
      buttons: {
        dom: {
          button: {
            className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
          }
        },
      buttons: [
        {
          text: '↻',
          autoClose: true,
          action: function (e, dt, node, config) {
            self.onRefresh();
          }
        },
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5]
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
                let data = "";
                for (let i = 0; i < dt.length; i++) {
                  data = "Hashlist\n\n"+  dt;
                }
                return data;
             }
            },
              'copy'
            ]
          },
          {
            extend: 'collection',
            text: 'Bulk Actions',
            drawCallback: function() {
              const hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
              $('.buttons-excel')[0].style.visibility = hasRows ? 'visible' : 'hidden'
            },
            buttons: [
                  {
                    text: 'Delete Hashlist(s)',
                    autoClose: true,
                    action: function (e, dt, node, config) {
                      self.onDeleteBulk();
                    }
                  },
                  {
                    text: 'Archive Hashlist(s)',
                    autoClose: true,
                    enabled: !this.isArchived,
                    action: function (e, dt, node, config) {
                      const edit = {isArchived: true};
                      self.onUpdateBulk(edit);
                    }
                  }
               ]
          },
          {
            text: !this.isArchived? 'Show Archived':'Show Live',
            action: function () {
              if(!self.isArchived) {
                self.router.navigate(['hashlists/archived']);
              }
              if(self.isArchived){
                self.router.navigate(['hashlists/hashlist']);
              }
            }
          },
          {
            extend: 'colvis',
            text: 'Column View',
            columns: [ 1,2,3,4,5],
          },
          {
            extend: "pageLength",
            className: "btn-sm"
          },
        ],
      }
    };

  });

}

onRefresh(){
  this.ngOnInit();
  this.rerender();  // rerender datatables
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    setTimeout(() => {
      this.dtTrigger['new'].next();
    });
  });
}

onArchive(id: number){
  this.gs.archive(SERV.HASHLISTS,id).subscribe((list: any) => {
    this.alert.okAlert('Archived!','');
    this.ngOnInit();
    this.rerender();  // rerender datatables
  });
}

onDelete(id: number, name: string){
  this.alert.deleteConfirmation(name,'Hashlists').then((confirmed) => {
    if (confirmed) {
      // Deletion
      this.gs.delete(SERV.HASHLISTS, id).subscribe(() => {
        // Successful deletion
        this.alert.okAlert(`Deleted Hashlist ${name}`, '');
        this.onRefreshTable(); // Refresh the table
      });
    } else {
      // Handle cancellation
      this.alert.okAlert(`Hashlist ${name} is safe!`,'');
    }
  });
}

onRefreshTable(){
  setTimeout(() => {
    this.ngOnInit();
    this.rerender();  // rerender datatables
  },2000);
}

// Bulk actions

onSelectedHashlists(){
  $(".dt-button-background").trigger("click");
  const selection = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
  if(selection.length == 0) {
    this.alert.okAlert('You haven not selected any Group','');
    return;
  }
  const selectionnum = selection.map(i=>Number(i));

  return selectionnum;
}

async onDeleteBulk() {
  const HashlistIds = this.onSelectedHashlists();
  this.alert.bulkDeleteAlert(HashlistIds,'Hashlists',SERV.HASHLISTS);
  this.onRefreshTable();
}

async onUpdateBulk(value: any) {
  const HashlistIds = this.onSelectedHashlists();
  this.alert.bulkUpdateAlert(HashlistIds,value,'Hashlists',SERV.HASHLISTS);
  this.onRefreshTable();
}

// Add unsubscribe to detect changes
ngOnDestroy(){
  this.dtTrigger.unsubscribe();
}

}
