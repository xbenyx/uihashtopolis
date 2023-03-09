import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ChunkService } from '../../core/_services/chunks.service';
import { TasksService } from '../../core/_services/tasks/tasks.sevice';
import { AgentsService } from '../../core/_services/agents/agents.service';
import { UIConfigService } from 'src/app/core/_services/shared/storage.service';

@Component({
  selector: 'app-chunks',
  templateUrl: './chunks.component.html'
})
export class ChunksComponent implements OnInit {
  faPlus=faPlus;
  faEye=faEye;

  constructor(
    private agentsService: AgentsService,
    private tasksService: TasksService,
    private chunkService: ChunkService,
    private uiService: UIConfigService,
    private route: ActivatedRoute,
  ) { }

  private maxResults = environment.config.prodApiMaxResults;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;

  public chunks: {chunkId: number,taskId: number,format: string,skip: number,length: number,agentId: number,dispatchTime: number,solveTime: number,checkpoint: number,progress: number,state: number,cracked: number,speed: number, agentName: string, taskName: string, isEdit: false}[] = [];

  ngOnInit(): void {

    this.uidateformat = this.uiService.getUIsettings('timefmt').value;

    this.chunksInit();

  }

  // Chunk View
  chunkview: number;
  chunkresults: Object;

  chunksInit(){

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'chunks':
          this.chunkview = 0;
          this.chunkresults = this.maxResults;
        break;

        case 'chunks-view':
          this.chunkview = 1;
          this.chunkresults = 100;
        break;

        case 'chunks-cAll':
          this.chunkview = 2;
          this.chunkresults = 10000;
        break;

      }
    });

    let params = {'maxResults': this.chunkresults};
    this.chunkService.getChunks(params).subscribe((chunks: any) => {
      this.tasksService.getAlltasks(params).subscribe((tasks: any) => {
      this.agentsService.getAgents(params).subscribe((agents: any) => {
        this.chunks = chunks.values.map(mainObject => {
          let matchAObject = agents.values.find(element => element.agentId === mainObject.agentId)
          let matchTObject = tasks.values.find(element => element.taskId === mainObject.taskId)
          return { ...mainObject, ...matchAObject, ...matchTObject }
        })
        this.dtTrigger.next(void 0);
        });
      });
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      select: true,
      processing: true,
      deferRender: true,
      destroy:true,
      buttons: {
        dom: {
          button: {
            className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt'
          }
        },
      buttons: [
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
            },
            {
              extend: 'print',
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
                var data = "";
                for (var i = 0; i < dt.length; i++) {
                  data = "Chunks\n\n"+  dt;
                }
                return data;
             }
            },
            {
              extend: 'copy',
            }
            ]
          }
        ],
      }
    };
  }

}
