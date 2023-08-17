import {  faPencil, faEdit, faTrash, faLock, faFileImport, faFileExport, faPlus, faHomeAlt, faArchive, faCopy, faBookmark, faEye, faMicrochip, faCheckCircle, faTerminal, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject, Subscription } from 'rxjs';

import { GlobalService } from '../../core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../core/_services/main.config';

declare let $:any;

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html'
})
@PageTitle(['Show Tasks'])
export class ShowTasksComponent implements OnInit {

  faCheckCircle=faCheckCircle;
  faNoteSticky=faNoteSticky;
  faFileImport=faFileImport;
  faFileExport=faFileExport;
  faMicrochip=faMicrochip;
  faTerminal=faTerminal;
  faBookmark=faBookmark;
  faArchive=faArchive;
  faPencil=faPencil;
  faHome=faHomeAlt;
  faTrash=faTrash;
  faEdit=faEdit;
  faLock=faLock;
  faPlus=faPlus;
  faCopy=faCopy;
  faEye=faEye;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  private updateSubscription: Subscription;

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  alltasks: any = []; //Change to Interface
  isArchived: boolean;
  whichView: string;
  isTaskactive = 0;
  currenspeed = 0;

  private maxResults = environment.config.prodApiMaxResults;

  constructor(
    private route:ActivatedRoute,
    private gs: GlobalService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'show-tasks':
          this.whichView = 'live';
          this.isArchived = false;
        break;

        case 'show-tasks-archived':
          this.whichView = 'archived';
          this.isArchived = true;
        break;

      }

    this.getTasks()

    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      bStateSave:true,
      destroy: true,
      select: {
        style: 'multi',
        // selector: 'tr>td:nth-child(1)' //This only allows select the first row
        },
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
        },
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              },
              customize: function ( win ) {
                $(win.document.body)
                    .css( 'font-size', '10pt' )
                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
             }
            },
            {
              extend: 'csvHtml5',
              exportOptions: {modifier: {selected: true}},
              select: true,
              customize: function (dt, csv) {
                let data = "";
                for (let i = 0; i < dt.length; i++) {
                  data = "Show Tasks\n\n"+  dt;
                }
                return data;
             }
            },
            {
              extend: 'copy',
            }
            ]
          },
          {
          extend: 'collection',
          text: 'Bulk Actions',
          drawCallback: function() {
            const hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
            $('.buttons-excel')[0].style.visibility = hasRows ? 'visible' : 'hidden'
          },
          buttons: [
                {
                  text: 'Delete Task(s)',
                  autoClose: true,
                  action: function (e, dt, node, config) {
                    self.onDeleteBulk();
                  }
                },
                {
                  text: 'Archive Task(s)',
                  autoClose: true,
                  enabled: !this.isArchived,
                  action: function (e, dt, node, config) {
                    const edit = {isArchived: true};
                    self.onUpdateBulk(edit);
                  }
                },
                // {
                //   text: 'Assign to Project (under construction)',
                //   autoClose: true,
                //   enabled: !this.isArchived,
                //   action: function ( e, dt, node, config ) {
                //     const title = 'Assign to Project'
                //     self.onModalProject(title)
                //   }
                // },
             ]
        },
        {
          text: !this.isArchived? 'Show Archived':'Show Live',
          action: function () {
            if(!self.isArchived) {
              self.router.navigate(['tasks/show-tasks-archived']);
            }
            if(self.isArchived){
              self.router.navigate(['tasks/show-tasks']);
            }
          }
        },
        {
          extend: 'colvis',
          text: 'Column View',
          columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          extend: "pageLength",
          className: "btn-sm"
        }
        ],
      }
    };

 });

}

onRefresh(){
  this.ngOnInit();
  this.rerender();  // rerender datatables
}

getTasks():void {
  const params = {'maxResults': this.maxResults, 'expand': 'crackerBinary,crackerBinaryType,hashlist,speeds', 'filter': 'isArchived='+this.isArchived+''}

  this.gs.getAll(SERV.TASKS,params).subscribe((tasks: any) => {
    this.alltasks = tasks.values;
    this.dtTrigger.next(null);
  });
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

onArchive(id: number){
  this.gs.archive(SERV.TASKS,id).subscribe(() => {
    Swal.fire({
      title: "Success",
      text: "Archived!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    this.ngOnInit();
    this.rerender();  // rerender datatables
  });
}

onDelete(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn',
        cancelButton: 'btn'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it can not be recovered!",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonColor: '#8A8584',
      confirmButtonColor: '#C53819',
      confirmButtonText: 'Yes, delete it!'
    })
  .then((result) => {
    if (result.isConfirmed) {
      this.gs.delete(SERV.TASKS,id).subscribe(() => {
        Swal.fire({
          title: "Success",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit();
        this.rerender();  // rerender datatables
      });
    } else {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your Task is safe!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      })
    }
  });
}

// Bulk actions

onSelectedTasks(){
  $(".dt-button-background").trigger("click");
  const selection = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
  if(selection.length == 0) {
    Swal.fire({
      title: "You haven't selected any Task",
      type: 'success',
      timer: 1500,
      showConfirmButton: false
    })
    return;
  }
  const selectionnum = selection.map(i=>Number(i));

  return selectionnum;
}

onDeleteBulk(){
  const self = this;
  const selectionnum = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
  const sellen = selectionnum.length;
  const errors = [];
  selectionnum.forEach(function (value) {
    Swal.fire('Deleting...'+sellen+' Task(s)...Please wait')
    Swal.showLoading()
  self.gs.delete(SERV.TASKS,value)
  .subscribe(
    err => {
      console.log('HTTP Error', err)
      err = 1;
      errors.push(err);
    },
    );
  });
  self.onDone(sellen);
}

onUpdateBulk(value: any){
    const self = this;
    const selectionnum = this.onSelectedTasks();
    const sellen = selectionnum.length;
    selectionnum.forEach(function (id) {
      Swal.fire('Updating...'+sellen+' Task(s)...Please wait')
      Swal.showLoading()
    self.gs.update(SERV.TASKS, id, value).subscribe(
    );
  });
  self.onDone(sellen);
}

onDone(value?: any){
  setTimeout(() => {
    this.ngOnInit();
    this.rerender();  // rerender datatables
    Swal.close();
    Swal.fire({
      title: 'Done!',
      type: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  },3000);
  }

onModalProject(title: string){
  (async () => {

    $(".dt-button-background").trigger("click");
    const selection = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
    if(selection.length == 0) {
      Swal.fire({
        title: "You haven't selected any Task",
        type: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: title,
      html:
        '<input id="project-input" class="swal2-input">',
      focusConfirm: false,
      confirmButtonColor: '#4B5563',
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('project-input')).value,
        ]
      }
    })

    if (formValues) {
      const edit = {projectName: +formValues};
      this.onUpdateBulk(edit);
    }

    })()
}

onModalUpdate(title: string, id: number, cvalue: any, formlabel: boolean, nameref: string){
  (async () => {

    const { value: formValues } = await Swal.fire({
      title: title + ' - '+ nameref,
      html:
        '<input id="project-input" class="swal2-input" type="number" placeholder="'+cvalue+'">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#C53819',
      confirmButtonColor: '#8A8584',
      cancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('project-input')).value,
        ]
      }
    })

    if (formValues) {
      if(cvalue !== Number(formValues[0])){
        let update;
        if(formlabel){
          update  = {priority: +formValues};
        }else{
          update  = {maxAgents: +formValues};
        }
        this.gs.update(SERV.TASKS,id, update).subscribe(() => {
          Swal.fire({
            title: "Success",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
          this.rerender();  // rerender datatables
        });
      }
    }

  })()
}

}
