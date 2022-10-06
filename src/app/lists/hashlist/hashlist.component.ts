import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListsService } from '../../service/lists/hashlist.service';
import { faEdit, faTrash, faLock, faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-hashlist',
  templateUrl: './hashlist.component.html',
  styleUrls: ['./hashlist.component.scss']
})
export class HashlistComponent implements OnInit, OnDestroy {
  faTrash=faTrash;
  faLock=faLock;
  faFileImport=faFileImport;
  faFileExport=faFileExport;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  allhashlists: any = [];
  constructor(private listsService: ListsService) { }

  ngOnInit(): void {
    this.listsService.getHashList().subscribe((list: any) => {
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
}
