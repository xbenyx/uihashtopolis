import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ChunkService } from '../../core/_services/chunks.service';
import { UIConfigService } from 'src/app/core/_services/shared/storage.service';

@Component({
  selector: 'app-chunks',
  templateUrl: './chunks.component.html'
})
export class ChunksComponent implements OnInit {
  faPlus=faPlus;
  faEye=faEye;

  constructor(
    private chunkService: ChunkService,
    private uiService: UIConfigService,
  ) { }

  private maxResults = environment.config.prodApiMaxResults;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;

  public chunks: {chunkId: number,taskId: number,format: string,skip: number,length: number,agentId: number,dispatchTime: number,solveTime: number,checkpoint: number,progress: number,state: number,cracked: number,speed: number, isEdit: false}[] = [];

  ngOnInit(): void {
    let params = {'maxResults': this.maxResults};
    this.chunkService.getChunks(params).subscribe((chunks: any) => {
      this.chunks = chunks.values;
      this.dtTrigger.next(void 0);
    });

    this.uidateformat = this.uiService.getUIsettings('timefmt').value;

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
