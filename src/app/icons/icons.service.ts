import { Injectable, InjectionToken, inject } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Icon, IconPathes } from './icons.model';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private svgIconRegistryService = inject(SvgIconRegistryService);

  constructor() {
    const sources: Observable<SVGElement | undefined | null>[] = Object.keys(IconPathes).map((icon) => {
      const iconPath = IconPathes[icon as Icon];
      return this.svgIconRegistryService.loadSvg(iconPath, icon) ?? of(null);
    })

    combineLatest(sources).subscribe((res) => {
      console.log('Icons loaded');
    });
  }
}

export const IconsToken =  new InjectionToken<typeof Icon>('icons', {
  providedIn: 'root',
  factory: () => Icon
});
