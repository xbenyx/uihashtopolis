import {
  PipeTransform,
  Pipe
} from '@angular/core';

/**
 * Transform bytes to a readable unit adding abbreviation units or long form
 * @param sizeB - The input number
 * @param longForm -The output unit abbreviation or long text
 * Usage:
 *   value | fileSize:Units
 * Example:
 *   {{ 1024 | fileSize:FILE_SIZE_UNITS }}
 * @returns 1KB
**/

@Pipe({
  name: 'avg'
})
export class AveragePipe implements PipeTransform {

  // transform(items: any[], attr: string): any {
  //   return items.reduce((a, b) => a + b[attr], 0);
  // }

  transform(value: any[], prop: string) {
    if (value.length === 0 || !prop) {
      return 'No data';
    }

    let arr = Object.values(value);
    let max = Math.max(...arr);

    return max;
  }

}
