import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrackerService } from '../../service/shared/cracker.service';
import { faEdit, faTrash, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-crackers',
  templateUrl: './crackers.component.html'
})
export class CrackersComponent implements OnInit, OnDestroy {
  public isCollapsed = true;
  faEdit=faEdit;
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crackerbinary: any = [];
  constructor(private crackerService: CrackerService) { }

  ngOnInit(): void {
    this.crackerService.crackerBinary().subscribe((binary: any) => {
      this.crackerbinary = binary;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true
    };
  }

  onSubmit(){
    Swal.fire({
      title: "Good job!",
      text: "New Cracker created!",
      icon: "success",
      button: "Close",
    });
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
        this.crackerService.deleteCracker(id).subscribe(() => {
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