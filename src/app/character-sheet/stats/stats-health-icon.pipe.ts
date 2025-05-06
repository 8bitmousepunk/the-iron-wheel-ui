import { Pipe, PipeTransform } from '@angular/core';
import { HealthPoint } from '../../characters';
import { Icon } from '../../icons';

const HealthPointIconMap = {
  [HealthPoint.Healthy]: Icon.PointFilled,
  [HealthPoint.Bashing]: Icon.PointCrossed,
  [HealthPoint.Lethal]: Icon.Lethal,
  [HealthPoint.Agravated]: Icon.Agravated
}

@Pipe({
  name: 'statsHealthIcon'
})
export class StatsHealthIconPipe implements PipeTransform {

  transform(value: HealthPoint): Icon {
    return HealthPointIconMap[value];
  }

}
