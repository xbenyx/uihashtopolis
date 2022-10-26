import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { HashtypeService } from '../../service/hashtype.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hashtypes',
  templateUrl: './hashtypes.component.html'
})
export class HashtypesComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(private hashtypeService: HashtypeService,
    private route:ActivatedRoute, private router:Router) { }

  public htypes: {hashTypeId: number, description: string, isSalted: number, isSlowHash: number}[] = [];

  ngOnInit(): void {

    this.hashtypeService.getHashTypes().subscribe((types: any) => {
      this.htypes = types;
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

  onSubmit(){
    Swal.fire({
      title: "Good job!",
      text: "New Hashtype created!",
      icon: "success",
      button: "Close",
    });
  }

  onDelete(id: number){
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
        Swal.fire(
          "File has been deleted!",
          {
          icon: "success",
        });
      } else {
        Swal.fire("Your imaginary file is safe!")
      }
    });
  }

}
