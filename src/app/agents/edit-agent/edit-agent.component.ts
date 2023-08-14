import { faAlignJustify, faIdBadge, faComputer, faKey, faInfoCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { faLinux, faWindows, faApple } from '@fortawesome/free-brands-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';

import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { environment } from './../../../environments/environment';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../core/_services/main.config';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html'
})
@PageTitle(['Edit Agent'])
export class EditAgentComponent implements OnInit {

  editMode = false;
  editedAgentIndex: number;
  editedAgent: any // Change to Model

  faAlignJustify=faAlignJustify;
  faInfoCircle=faInfoCircle;
  faComputer=faComputer;
  faIdBadge=faIdBadge;
  faWindows=faWindows;
  faLinux=faLinux;
  faApple=faApple;
  faKey=faKey;
  faEye=faEye;

  private maxResults = environment.config.prodApiMaxResults;

  constructor(
    private uiService: UIConfigService,
    private route:ActivatedRoute,
    private gs: GlobalService,
    private router: Router
  ) { }

  updateForm: FormGroup
  showagent: any = [];
  users: any = [];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;

  ngOnInit(): void {

    this.uidateformat = this.uiService.getUIsettings('timefmt').value;

    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedAgentIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.assignChunksInit(this.editedAgentIndex);
      }
    );

    this.updateForm = new FormGroup({
      'isActive': new FormControl(''),
      'userId': new FormControl({value: '', disabled: true}),
      'agentName': new FormControl(''),
      'token': new FormControl({value: '', disabled: true}),
      'cpuOnly': new FormControl(),
      'cmdPars': new FormControl(''),
      'ignoreErrors': new FormControl(''),
      'isTrusted': new FormControl('')
    });

    const id = +this.route.snapshot.params['id'];
    this.gs.get(SERV.AGENTS,id).subscribe((agent: any) => {
      this.showagent = agent;
    });

    const params = {'maxResults': this.maxResults};
    this.gs.getAll(SERV.USERS, params).subscribe((user: any) => {
      this.users = user.values;
    });

  }

  timespent: number;
  getchunks: any;

  timeCalc(chunks){
    const tspent = [];
    for(let i=0; i < chunks.length; i++){
      tspent.push(Math.max(chunks[i].solveTime, chunks[i].dispatchTime)-chunks[i].dispatchTime);
    }
    this.timespent = tspent.reduce((a, i) => a + i);
  }

  assignChunksInit(id: number){
    const params = {'maxResults': 999999};
    this.gs.getAll(SERV.CHUNKS,params).subscribe((c: any)=>{
      const getchunks = c.values.filter(u=> u.agentId == id);
      this.gs.getAll(SERV.TASKS,params).subscribe((t: any)=>{
        this.getchunks = getchunks.map(mainObject => {
          const matchObjectAgents = t.values.find(e => e.taskId === mainObject.taskId)
          return { ...mainObject, ...matchObjectAgents}
        })
      this.timeCalc(this.getchunks);
      this.dtTrigger.next(void 0);
      })
    });

    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      scrollY: "700px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
      buttons: {
          dom: {
            button: {
              className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
            }
          },
      buttons:[
        {
          text: '↻',
          autoClose: true,
          action: function (e, dt, node, config) {
            self.onRefresh();
          }
        },
        {
          extend: 'colvis',
          text: 'Column View',
          columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
      ]
      }
    }
  }

  onRefresh(){
    this.ngOnInit();
    this.rerender();  // rerender datatables
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

  onSubmit(){
    if (this.updateForm.valid) {

      this.gs.update(SERV.AGENTS,this.editedAgentIndex,this.updateForm.value).subscribe(() => {
          Swal.fire({
            title: "Success",
            text: "Agent updated!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.updateForm.reset(); // success, we reset form
          this.router.navigate(['agents/show-agents']);
        },
      );
    }
  }

  private initForm() {
    if (this.editMode) {
      this.gs.get(SERV.AGENTS,this.editedAgentIndex).subscribe((result)=>{
      this.updateForm = new FormGroup({
        'isActive': new FormControl(result['isActive'], [Validators.required]),
        'userId': new FormControl(result['userId']),
        'agentName': new FormControl(result['agentName'], [Validators.required]),
        'token': new FormControl(result['token']),
        'cpuOnly': new FormControl(result['cpuOnly']),
        'cmdPars': new FormControl(result['cmdPars']),
        'ignoreErrors': new FormControl(result['ignoreErrors']),
        'isTrusted': new FormControl(result['isTrusted'])
      });
    });
   }
  }

}
