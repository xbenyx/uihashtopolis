import {
  PipeTransform,
  Pipe
} from '@angular/core';

import { GlobalService } from '../_services/main.service';
import { SERV } from '../_services/main.config';
import { firstValueFrom } from 'rxjs';

/**
 * This function returns number of assigned agents
 * @param id - Task Id
 * Usage:
 *   object | aassigned:'id'
 * Example:
 *   {{ number | aassigned:'1' }}
 * @returns number
**/

@Pipe({
  name: 'aassigned'
})
export class AgentsAssignedPipe implements PipeTransform {

  constructor(
    private gs: GlobalService
  ) { }

  transform(id: number){

      const maxResults = 500; //Max Agents

      return firstValueFrom(this.gs.getAll(SERV.AGENT_ASSIGN,{'maxResults': maxResults,'filter': 'taskId='+id+''}))
        .then((res) => {
          return res.values.length;
      });
    }
}
