import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpper',
  standalone: true,
})
export class ToUpperPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    return value ? value.toUpperCase() : '';
  }
}
