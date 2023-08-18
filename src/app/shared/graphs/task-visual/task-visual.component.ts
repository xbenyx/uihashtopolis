import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import canvas from 'canvas';

import { GlobalService } from '../../../core/_services/main.service';
import { SERV } from '../../../core/_services/main.config';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'task-visual',
  template: `
  <canvas #myCanvas style="border: 1px solid;width:100%;"  height="100">
    Fallback content
  </canvas>
  `
})
export class TaskVisualomponent  {

  @ViewChild("myCanvas") canvasRef: ElementRef;
  @Input() tkeyspace: any;
  @Input() taskid: any;
  @Input() cprogress: any;
  @Input() tusepreprocessor: any;
  private ctx: CanvasRenderingContext2D;

  constructor(
    private gs: GlobalService
  ) { }

  ngAfterViewInit () {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.drawPoint();
  }

  drawPoint() {

    const maxResults = 10000;
    const x = 100;
    const y = 200;
    // const maxResults = environment.config.prodApiMaxResults;

    const searched = []

    return firstValueFrom(this.gs.getAll(SERV.CHUNKS,{'maxResults': maxResults, 'filter': 'taskId='+this.taskid+''}))
    .then((res) => {
      const ch = res.values;

      var keyspace = Number(this.tkeyspace);
      var progress = Number(this.cprogress);

      // if(this.tusepreprocessor === 1 && this.tkeyspace <= 0){
      //   break;
      // }
      console.log(keyspace);
      console.log(progress);

      for(let i=0; i < ch.length; i++){
        var start = Math.floor((100 - 1) * ch[i]['skip'] / keyspace);
        var end = Math.floor((100 - 1) * (ch[i]['skip'] + keyspace+ ch[i]['length'])/keyspace) -1;
        var current = Math.floor((100 - 1) * (ch[i]['skip'] + keyspace+ ch[i]['length'] * progress / 10000) /keyspace) -1;

        console.log(start);
        console.log(end);
        console.log(current);
        if(current > end) {
          current = end;
        }

       if(end - start < 3){

        if(ch[i]['state'] >= 6){


        }if (ch[i]['cracked'] > 0) {


        } else {


        }
       }else{
        console.log('here');
        this.ctx.beginPath();
        this.ctx.arc(100, 100, 30, 0, 2 * Math.PI);
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();
       }

      }


      // this.ctx.beginPath();
      // this.ctx.arc(50, 50, 30, 0, 2 * Math.PI);
      // this.ctx.fillStyle = "darkred";
      // this.ctx.fill();

    });

  }

  // Setting colours


  // Preparing data

  // Get Keyspace Progress
  // Max keyspace progress


  //Load all chunks





}


