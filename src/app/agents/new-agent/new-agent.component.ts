import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { CrackerService } from '../../core/_services/config/cracker.service';
import { VoucherService } from '../../core/_services/agents/voucher.service';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html'
})
export class NewAgentComponent implements OnInit, OnDestroy {
  // Loader
  isLoading = false;
  // Form attributtes
  faTrash=faTrash;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createForm: FormGroup
  crackerbinary: any = [];
  vouchers: any = [];

  randomstring:any

  constructor(
    private crackerService: CrackerService,
    private voucherService: VoucherService
  ) { }

  private maxResults = environment.config.prodApiMaxResults;

  pathURL = location.protocol + '//' + location.hostname + ':' + environment.config.prodApiPort;
  public agentURL = this.pathURL + environment.config.agentURL;
  public agentdownloadURL = this.pathURL + environment.config.agentdownloadURL;

  ngOnInit(): void {

    // URL paths

    // Generate Voucher
    this.randomstring = Math.random().toString(36).slice(-8);

    this.createForm = new FormGroup({
      'voucher': new FormControl(''),
    });

    let params = {'maxResults': this.maxResults}

    this.voucherService.getVouchers(params).subscribe((vouchers: any) => {
      this.vouchers = vouchers.values;
    });

    this.crackerService.getCrackerBinary().subscribe((binary: any) => {
      this.crackerbinary = binary;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
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
      text: "Once deleted, it can not be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.voucherService.deleteVoucher(id).subscribe(() => {
          Swal.fire(
            "Voucher has been deleted!",
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
          'No worries, your Voucher is safe!',
          'error'
        )
      }
    });
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.voucherService.createVoucher(this.createForm.value).subscribe((hasht: any) => {
        const response = hasht;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New Voucher created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
          this.rerender();  // rerender datatables
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "Voucher was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }

}
