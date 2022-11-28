import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warningColor'
})
export class WarningColorPipe implements PipeTransform {

  transform(value: any) {
    if(value == 'information')
      return '#397b39';
    else if (value == 'warning')
      return '#b16a06';
    else if (value == 'error')
      return '#8b0010';
    else if (value == 'fatal error')
      return '#750404';
    else
      return 'white';
  }
}
