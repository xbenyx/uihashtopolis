import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ChunkService } from '../service/chunks.service';

@Component({
  selector: 'app-chunk-activity',
  templateUrl: './chunk-activity.component.html'
})
export class ChunkActivityComponent implements OnInit {
  faPlus=faPlus;

  constructor(
    private chunkService: ChunkService
  ) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public chunks: {chunkId: number,taskId: number,format: string,skip: string,length: number,agentId: number,dispatchTime: number,solveTime: number,checkpoINT: number,progress: number,state: number,cracked: number,speed: number, isEdit: false}[] = [];

  ngOnInit(): void {

    this.chunkService.getChunks().subscribe((hasht: any) => {
      this.chunks = hasht.values;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      select: true,
      processing: true,
      deferRender: true,
      destroy:true,
      buttons: ['copy', 'excel', 'csv', 'edit']
    };

  }

}
