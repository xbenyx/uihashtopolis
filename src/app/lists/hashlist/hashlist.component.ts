import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListsService } from '../../service/lists/hashlist.service';
import { faEdit, faTrash, faLock, faFileImport, faFileExport, faPlus, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
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

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  allhashlists: any = [];
  constructor(private listsService: ListsService) { }

  ngOnInit(): void {
    this.listsService.getAllhashlists().subscribe((list: any) => {
      this.allhashlists = list;
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

  deleteFile(id: number){
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.listsService.deleteHashlist(id).subscribe(() => {
          Swal.fire(
            "File has been deleted!",
            {
            icon: "success",
          });
        });
      } else {
        Swal.fire("Your imaginary file is safe!")
      }
    });
  }

}
