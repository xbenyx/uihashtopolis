import {
  PipeTransform,
  Pipe
} from '@angular/core';

import { UIConfigService } from '../_services/shared/storage.service';

/**
 * This function calculates the total agent speed and return the value and the tag active
 * @param value - Object
 * @param name -Column name
 * Usage:
 *   object | sum:'name'
 * Example:
 *   {{ object | sum:'value' }}
 * @returns number
**/

@Pipe({
  name: 'aspeed'
})
export class AgentsSpeedPipe implements PipeTransform {

  constructor(
    private uiService:UIConfigService
  ) { }

  isactive = 0;
  currenspeed = 0;

  transform(getchunks: any[],active?: number) {

      const chunktime = this.uiService.getUIsettings('chunktime').value;
      console.log(chunktime);
      const cspeed = [];

      if (getchunks.length === 0) {
        return 'No data';
      }

      if(active === 1){
        const lastItem = getchunks.slice(-1)[0]['time'];
        if(Date.now()/1000 - lastItem < 60){
          return true;
        }
      }

      return false;

      // for(let i=0; i < getchunks.length; i++){
      //   if(Date.now()/1000 - getchunks[i].time < chunktime && getchunks[i].progress < 10000){
      //     this.isactive = 1;

      //     cspeed.push(getchunks[i].speed);
      //   }
      // }

      // return this.currenspeed = cspeed.reduce((a, i) => a + i);

    }
}
