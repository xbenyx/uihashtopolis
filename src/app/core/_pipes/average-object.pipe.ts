import {
  PipeTransform,
  Pipe
} from '@angular/core';

/**
 * This function takes the object access the key values annd returns the max value
 * @param value - Object
 * @param props -Column name
 * Usage:
 *   object | avg:'name'
 * Example:
 *   {{ object | avg:'value' }}
 * @returns number
**/

@Pipe({
  name: 'avg'
})
export class AveragePipe implements PipeTransform {

  transform(value: any[], props: string) {
      if (value.length === 0) {
        return 'No data';
      }

      var arr = [];

      for(let i=0; i<value.length; i++){
        arr.push(value[i][props]);
      }
      var max = Math.max(...arr)

      return max;

    }
}
