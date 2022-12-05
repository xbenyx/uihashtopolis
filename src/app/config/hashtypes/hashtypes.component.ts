import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HashtypeService } from '../../service/hashtype.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hashtypes',
  templateUrl: './hashtypes.component.html'
})
export class HashtypesComponent implements OnInit {
  // Loader
  isLoading = false;
  // Form attributtes
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;

  // Create Hashtype
  signupForm: FormGroup;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(private hashtypeService: HashtypeService,
    private route:ActivatedRoute, private router:Router) { }

  public htypes: {hashTypeId: number, description: string, isSalted: number, isSlowHash: number}[] = [];

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'hashTypeId': new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(6)]),
      'description': new FormControl(null),
      'isSalted': new FormControl(false),
      'isSlowHash': new FormControl(false)
    });

    this.hashtypeService.getHashTypes().subscribe((types: any) => {
      this.htypes = types.values;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      select: true,
      processing: true,  // Error loading
      deferRender: true,
      destroy:true,
      buttons: ['copy', 'excel', 'csv', 'edit']
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

  onSubmit(): void{
    if (this.signupForm.valid) {
    console.log(this.signupForm);

    this.isLoading = true;

    this.hashtypeService.createHashType(this.signupForm.value).subscribe((user: any) => {
      this.isLoading = false;
      Swal.fire({
        title: "Good job!",
        text: "New Hashtype created!",
        icon: "success",
        button: "Close",
      });
    });

    this.signupForm.reset();
    }
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
      text: "Once deleted, you will not be able to recover this Hashtype!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.hashtypeService.deleteHashType(id).subscribe(() => {
          Swal.fire(
            "File has been deleted!",
            {
            icon: "success",
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

}
