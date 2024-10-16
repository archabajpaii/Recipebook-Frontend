import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined || value < 0) return '';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let timeString = '';
    if (hours > 0) {
      timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      timeString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return timeString.trim();
  }
}
