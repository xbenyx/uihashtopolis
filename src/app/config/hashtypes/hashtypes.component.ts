import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faEdit, faSave, faCancel} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HashtypeService } from '../../service/hashtype.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js'; //ToDo Change to a Common Module

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
  faEdit=faEdit;
  faSave=faSave;
  faCancel=faCancel;

  // Create Hashtype
  signupForm: FormGroup;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(private hashtypeService: HashtypeService,
    private route:ActivatedRoute, private router:Router) { }

  public htypes: {hashTypeId: number, description: string, isSalted: number, isSlowHash: number, isEdit: false}[] = [];

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'hashTypeId': new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"), this.checkHashtypeExist.bind(this), Validators.minLength(1)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'isSalted': new FormControl(false),
      'isSlowHash': new FormControl(false)
    });

    this.hashtypeService.getHashTypes().subscribe((hasht: any) => {
      this.htypes = hasht.values;
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

  // Not implemented - ToDo
  checkHashtypeExist(control: FormControl): {[s: string]: boolean}{
    if(this.htypes.indexOf(control.value) !== -1){
      return {'hashtypeIsUsed': true};
    }
    return null as any;
  }

  onSubmit(): void{
    if (this.signupForm.valid) {
    console.log(this.signupForm);

    this.isLoading = true;

    this.hashtypeService.createHashType(this.signupForm.value).subscribe((hasht: any) => {
      const response = hasht;
      console.log(response);
      this.isLoading = false;
        Swal.fire({
          title: "Good job!",
          text: "New Hashtype created!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit();
        this.rerender();  // rerender datatables
        this.isCollapsed = true; //Close button new hashtype
      },
      errorMessage => {
        // check error status code is 500, if so, do some action
        Swal.fire({
          title: "Error!",
          text: "Hastype was not created, please try again!",
          icon: "warning",
          showConfirmButton: true
        });
        this.ngOnInit();
        this.rerender();  // rerender datatables
      }
    );
    this.signupForm.reset(); // success, we reset form
    }
  }

  onEdit(item: any){
    this.htypes.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  onSave(item: any){
    console.log(item);
    this.hashtypeService.updateHashType(item).subscribe((hasht: any) => {
      this.isLoading = false;
      Swal.fire({
        title: "Updated!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
    });
    this.ngOnInit();  // reload ngOnInit
    this.rerender();  // Destroy and rerender table
    item.isEdit = false; //Change Edit status to false
  }

  onCancel(item: any){
    item.isEdit = false;

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
        this.hashtypeService.deleteHashType(id).subscribe(() => {
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
