import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash, faLock, faFileImport, faFileExport, faArchive, faPlus, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ListsService } from '../../core/_services/hashlist/hashlist.service';
import { UsersService } from 'src/app/core/_services/users/users.service';

@Component({
  selector: 'app-hashlist',
  templateUrl: './hashlist.component.html'
})

export class HashlistComponent implements OnInit, OnDestroy {
  faEdit=faEdit;
  faTrash=faTrash;
  faLock=faLock;
  faFileImport=faFileImport;
  faFileExport=faFileExport;
  faPlus=faPlus;
  faHome=faHomeAlt;
  faArchive=faArchive;

  @ViewChild(DataTableDirective, {static: false})
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
    isSecret: number,
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
    private listsService: ListsService,
    private route:ActivatedRoute,
    private users: UsersService
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

    let params = {'maxResults': this.maxResults, 'expand': 'hashType,accessGroup', 'filter': 'isArchived='+this.isArchived+''}

    this.listsService.getAllhashlists(params).subscribe((list: any) => {
      this.allhashlists = list.values.filter(u=> u.format != 3); // Exclude superhashlists
      this.dtTrigger.next(void 0);
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      stateSave: true,
      select: true,
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
                columns: [0, 1, 2, 3, 4]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [0, 1, 2, 3, 4]
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
                  data = "Hashlist\n\n"+  dt;
                }
                return data;
             }
            },
              'copy'
            ]
          },
          {
            extend: 'colvis',
            text: 'Column View',
            columns: [ 1,2,3,4 ],
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

// Set permissions
manageHashlistAccess: any;

setAccessPermissions(){
  this.users.getUser(this.users.userId,{'expand':'globalPermissionGroup'}).subscribe((perm: any) => {
      this.manageHashlistAccess = perm.globalPermissionGroup.permissions.manageHashlistAccess;
  });
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
  if(this.manageHashlistAccess || typeof this.manageHashlistAccess == 'undefined'){
  this.listsService.archiveHashlist(id).subscribe((list: any) => {
    Swal.fire({
      title: "Good job!",
      text: "Archive!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    this.ngOnInit();
    this.rerender();  // rerender datatables
  });
  }else{
    Swal.fire({
      title: "ACTION DENIED",
      text: "Please contact your Administrator.",
      icon: "error",
      showConfirmButton: false,
      timer: 2000
    })
  }
}

onDelete(id: number){
  if(this.manageHashlistAccess || typeof this.manageHashlistAccess == 'undefined'){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, it can not be recovered!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#4B5563',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
  .then((result) => {
    if (result.isConfirmed) {
      this.listsService.deleteHashlist(id).subscribe(() => {
        Swal.fire(
          "HashList has been deleted!",
          {
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit();
        this.rerender();  // rerender datatables
      });
    } else {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'No worries, your HashList is safe!',
        'error'
      )
    }
  });
  }else{
    Swal.fire({
      title: "ACTION DENIED",
      text: "Please contact your Administrator.",
      icon: "error",
      showConfirmButton: false,
      timer: 2000
    })
  }
}
// Add unsubscribe to detect changes
ngOnDestroy(){
  this.dtTrigger.unsubscribe();
}

}
