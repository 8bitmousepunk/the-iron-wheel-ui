import { Pipe, PipeTransform } from '@angular/core';
import { HealthPoint } from '../../characters';

const HealthPointIconMap = {
  [HealthPoint.Healthy]: '/icons/point_filled.svg',
  [HealthPoint.Bashing]: '/icons/point_crossed.svg',
  [HealthPoint.Lethal]: '/icons/lethal.svg',
  [HealthPoint.Agravated]: '/icons/agravated.svg'
}

@Pipe({
  name: 'statsHealthIcon'
})
export class StatsHealthIconPipe implements PipeTransform {

  transform(value: HealthPoint): string {
    return HealthPointIconMap[value];
  }

}
