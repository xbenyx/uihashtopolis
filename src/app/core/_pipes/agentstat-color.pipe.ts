import {
  PipeTransform,
  Pipe,
} from '@angular/core';

/**
 * Returns different color depending on thresholds
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
    if (+value > threshold1 && (stattype == 1 || stattype == 3))
      return '#009933';
    else if (+value > threshold2 && (stattype == 1 || stattype == 3))
      return '#ff9900';
    if (+value <= threshold1 && stattype == 2)
      return '#009933';
    else if (+value <= threshold2 && stattype == 2 )
      return '#ff9900';
    else
      return '#800000';
  }
}
