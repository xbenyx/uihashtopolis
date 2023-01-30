import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform seconds to a readable format
 * Usage:
 *   value | sectotime
 * Example:
 *   {{ 55 | sectotime }}
 *   formats to: 00:00:55  (55 seconds)
*/

@Pipe({
  name: 'sectotime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(seconds: number): string {

    let result: number | string = 0;
    let formatted: string;
    let daylabel: string;
    let daysformatted: string = '';

    if (seconds < 1 ) { return result = 'N/A'; }

    const secondsDay = (60*60*24);  // Seconds in a day
    if (seconds >= secondsDay){
      let day = Math.floor(seconds / secondsDay);
      if(day === 1){ daylabel = ' Day '}else{daylabel = ' Days '}
      daysformatted = day + daylabel;
      seconds = (seconds - (secondsDay*day));   // Remaining Time
    }

    formatted = daysformatted + new Date(seconds * 1000).toISOString().slice(11, 19);

    return `${formatted}`;
  }

}
