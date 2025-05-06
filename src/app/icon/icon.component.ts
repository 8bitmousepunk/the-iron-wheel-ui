import { Component, Input, inject } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconsService, Icon } from '../icons';

@Component({
  selector: 'app-icon',
  imports: [AngularSvgIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() name!: Icon;

  private iconsService = inject(IconsService);
}
