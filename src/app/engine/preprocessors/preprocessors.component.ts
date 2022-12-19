import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { PreprocessorService } from '../../core/_services/config/preprocessors.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-preprocessors',
  templateUrl: './preprocessors.component.html'
})
export class PreprocessorsComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEdit=faEdit;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public preproc: {preprocessorId: number, name: string, url: string, binaryName: string, keyspaceCommand: string, skipCommand: string, limitCommand: string}[] = [];

  constructor(private preprocessorService: PreprocessorService,
    private route:ActivatedRoute, private router:Router) { }

    ngOnInit(): void {
      this.preprocessorService.getPreprocessor().subscribe((pre: any) => {
        this.preproc = pre;
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
        text: "New Binary created!",
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
