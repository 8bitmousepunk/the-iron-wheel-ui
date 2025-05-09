import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconsToken } from '../icons';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-theme-button',
  imports: [IconComponent],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.css'
})
export class ThemeButtonComponent {
  themeService = inject(ThemeService);
  icons = inject(IconsToken);

  switchTheme(): void {
    this.themeService.switchTheme();
  }
}
