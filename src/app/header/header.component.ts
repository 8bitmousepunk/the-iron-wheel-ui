import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconsToken } from '../icons';
@Component({
  selector: 'app-header',
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  icons = inject(IconsToken);
}
