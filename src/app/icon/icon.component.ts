import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, map, combineLatest } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IconsService, Icon, IconThemeMap } from '../icons';
import { ThemeService, Theme } from '../theme/theme.service';

@Component({
  selector: 'app-icon',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent implements OnInit {
  @Input() set name(val: Icon) {
    this.name$.next(val);
  };
  get name(): Icon | null {
    return this.name$.value;
  }
  private name$: BehaviorSubject<Icon | null> = new BehaviorSubject<Icon | null>(null);
  icon$!: Observable<Icon | null>;

  private iconsService = inject(IconsService);
  private themService = inject(ThemeService);

  ngOnInit(): void {
    this.icon$ = combineLatest([this.themService.currentTheme$, this.name$]).pipe(
      map(([theme]) => this.getThemeIcon(theme))
    );
  }

  getThemeIcon(theme: Theme): Icon | null {
    if (!this.name) return null;

    const iconTheme = IconThemeMap[this.name];
    if (iconTheme) {
      return iconTheme[theme];
    }

    return this.name;
  }
}
