import {
  PipeTransform,
  Pipe
} from '@angular/core';

/**
 * Returns dispatched
 * @param obj - Object of chunks
 * @param id - Task Id
**/

@Pipe({
  name: 'tdispatched'
})
export class TaskDispatchedPipe implements PipeTransform {

  transform(obj: any, id: number, keyspace: number) {

    if (!obj || !id) {
      return null;
    }

    // const params = {'maxResults': 999999999};
    // this.gs.getAll(SERV.CHUNKS,params).subscribe((c: any)=>{
    //   this.loadchunks = c;
    // });

    const ch = obj.values?.filter(u=> u.taskId == id);

    const dispatched = []

    for(let i=0; i < ch.length; i++){
      if(ch[i].progress >= 10000){
        dispatched.push(ch[i]['length']);
      }else{
        dispatched.push(ch[i]['length']);
      }
    }

    return dispatched?.reduce((a, i) => a + i,0)/keyspace;

    }
}

