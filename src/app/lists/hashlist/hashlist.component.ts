import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ListsService } from '../../service/lists/hashlist.service';
import { faEdit, faTrash, faLock, faFileImport, faFileExport, faArchive, faPlus, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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

  // allhashlists: any = [];
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
  }[] = [];

  constructor(private listsService: ListsService) { }

  ngOnInit(): void {
    this.listsService.getAllhashlists().subscribe((list: any) => {
      this.allhashlists = list.values;
      this.dtTrigger.next(void 0);
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      stateSave: true,
      select: true,
      pageLength: 50,
      "order": [ [0, 'asc'] ],
      "columnDefs": [
        { "orderable": false, "targets": [5, 6] },
        { "orderable": true, "targets": [0, 1, 2, 3, 4] }
      ],
      buttons: [
        'copy', 'excel', 'csv', 'edit'
    ]
    };
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

  onDelete(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: "Are you sure?",
      text: "If your Hashtype is being in a Hashlist/Task that could lead to issues!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.listsService.deleteHashlist(id).subscribe(() => {
          Swal.fire(
            "Hashtype has been deleted!",
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
          'No worries, your Hashtype is safe!',
          'error'
        )
      }
    });
  }
  // Add unsubscribe to detect changes
  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

}
