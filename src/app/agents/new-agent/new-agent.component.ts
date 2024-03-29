import { faTrash, faDownload, faInfoCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';

import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { ConfigService } from 'src/app/core/_services/shared/config.service';
import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../core/_services/main.config';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html'
})
@PageTitle(['New Agent'])
export class NewAgentComponent implements OnInit, OnDestroy {

  // Form attributtes
  faInfoCircle=faInfoCircle;
  faDownload=faDownload;
  faTrash=faTrash;
  faCopy=faCopy;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  dtOptions1: any = {};

  createForm: FormGroup
  binaries: any = [];
  vouchers: any = [];

  randomstring:any

  constructor(
    private uiService: UIConfigService,
    private alert: AlertService,
    private gs: GlobalService,
    private cs:ConfigService
  ) { }

  private maxResults = environment.config.prodApiMaxResults;

  public agentdownloadURL: string;
  public agentURL: string;

  ngOnInit(): void {

    const path = this.cs.getEndpoint().replace('/api/v2', '');

    this.agentdownloadURL = path + environment.config.agentdownloadURL;
    this.agentURL = path + '/api' +environment.config.agentURL;

    // Generate Voucher
    this.randomstring = Math.random().toString(36).slice(-8);

    this.createForm = new FormGroup({
      'voucher': new FormControl(''),
    });

    const params = {'maxResults': this.maxResults};

    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      destroy: true,
      scrollX: true,
      searching: false,
      paging: false,
      info: false,
      pageLength: 25,
      processing: true,
      lengthMenu: [
          [10, 25, 50, 100, 250, -1],
          [10, 25, 50, 100, 250, 'All']
      ],
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
          text: '↻',
          autoClose: true,
          action: function (e, dt, node, config) {
            self.onRefresh();
          }
        }
        ],
      }
    };

    this.gs.getAll(SERV.AGENT_BINARY).subscribe((bin: any) => {
      this.binaries = bin.values;
      this.dtTrigger.next(void 0);
    });

    this.gs.getAll(SERV.VOUCHER,params).subscribe((vouchers: any) => {
      this.vouchers = vouchers.values;
      this.dtTrigger1.next(void 0);
    });

  }

  ngOnDestroy(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy DataTable when the component is destroyed to avoid memory leaks
        dtInstance.destroy();
      });
    }
  }

  onRefresh(){
    this.rerender();
    this.ngOnInit();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      setTimeout(() => {
        this.dtTrigger['new'].next();
        // this.dtTrigger1['new'].next();
      });
    });
  }

  onDelete(id: number, name: string ){
    this.alert.deleteConfirmation(name,'Vouchers').then((confirmed) => {
      if (confirmed) {
        // Deletion
        this.gs.delete(SERV.VOUCHER, id).subscribe(() => {
          // Successful deletion
          this.alert.okAlert(`Deleted Voucher ${name}`, '');
          this.onRefreshTable(); // Refresh the table
        });
      } else {
        // Handle cancellation
        this.alert.okAlert(`Your Voucher ${name} is safe!`,'');
      }
    });
  }

  onRefreshTable(){
    setTimeout(() => {
      this.ngOnInit();
      this.rerender();  // rerender datatables
    },2000);
  }

  downloadClient(id) {
    window.location.href= this.agentdownloadURL+id;
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.gs.create(SERV.VOUCHER,this.createForm.value).subscribe(() => {
        this.alert.okAlert('New Voucher created!','');
        this.ngOnInit();
        this.rerender();  // rerender datatables
        }
      );
    }
  }

}
