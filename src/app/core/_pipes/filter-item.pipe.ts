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
  name: 'filterItem'
})
export class FilterItemPipe implements PipeTransform {

  transform(value: any, filterString:string, id?: number) {
    // use the id
    if(value === undefined  || value === null) return value;

    console.log(value)

    return value.filter(function(element) {
        return element.name.toLowerCase().includes(filterString.toLocaleLowerCase());
    })
}

}
