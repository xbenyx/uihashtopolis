import {
  PipeTransform,
  Pipe,
} from '@angular/core';
import { ASC } from '../_constants/agentsc.config';

/**
 * Returns different hex color depending on thresholds and Agent type
 * 1 = Device Temperature, 2 = Device Utilizations, 3 = CPU utilization
 * @param value - The input number value
 * Usage:
 *   value | asColor
 * Example:
 *   {{ 65 | asColor }}
 * @returns #b16a06
**/

@Pipe({
  name: 'asColor'
})
export class AgentSColorPipe implements PipeTransform {

  transform(value: any, threshold1: number, threshold2: number, stattype: number ) {
    if(+value == 0)
      return '#FF0000';
    if (+value > threshold1 && (stattype == ASC.GPU_TEMP || stattype == ASC.CPU_UTIL))
      return console.log(ASC.CPU_UTIL)
      // return '#009933';
    else if (+value > threshold2 && (stattype == ASC.GPU_TEMP || stattype == ASC.CPU_UTIL))
      return '#ff9900';
    if (+value <= threshold1 && stattype == ASC.GPU_UTIL)
      return '#009933';
    else if (+value <= threshold2 && stattype == ASC.GPU_UTIL )
      return '#ff9900';
    else
      return '#800000';
  }
}
