import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString'
})
export class ShortenStringPipe implements PipeTransform {

  transform(value: any, limit: number) {
    if(value.length > limit){
      return value.substr(0, limit) +'...';
    }
    return value;
  }

}
