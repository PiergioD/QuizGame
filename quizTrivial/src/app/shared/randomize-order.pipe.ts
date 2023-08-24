import { Pipe, PipeTransform } from '@angular/core';
import { Risposta } from '../interfaces/Risposta';

@Pipe({
  name: 'randomizeOrder',
})
export class RandomizeOrderPipe implements PipeTransform {
  transform(array: any[] = [], ...args: unknown[]): any[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
