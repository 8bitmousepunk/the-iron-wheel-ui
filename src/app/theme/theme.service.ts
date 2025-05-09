import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  Light = 'light',
  Dark =  'dark'
}

export const DARK_THEME_CLASS: string = 'dark-theme';
export const LIGHT_THEME_CLASS: string = 'light-theme';

export const LOCAL_STORAGE_THEME_KEY: string = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  currentTheme$: BehaviorSubject<Theme>;
  set currentTheme(val: Theme) {
    this.currentTheme$.next(val);
  }
  get currentTheme(): Theme {
    return this.currentTheme$.value;
  }

  constructor() {
    const theme = this.getThemeFromLocalStorage();
    this.currentTheme$ = new BehaviorSubject(theme);

    this.currentTheme$.subscribe(() => {
      this.setThemeClass();
      this.saveThemeToLocalStorage();
    })
  }

  getThemeFromLocalStorage(): Theme {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

    if (!theme && !this.isValidTheme(theme)) {
      return Theme.Light
    }
    else {
      return theme as Theme;
    }
  }

  saveThemeToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, this.currentTheme);
  }

  isValidTheme(val: string | null): boolean {
    if (val === Theme.Light || val === Theme.Dark) return true;
    else return false
  }

  switchTheme() {
    if (this.currentTheme === Theme.Light) {
      this.currentTheme = Theme.Dark;
    } else {
      this.currentTheme = Theme.Light;
    }
  }

  setThemeClass() {
    if (this.currentTheme === Theme.Dark) {
      document.body.classList.remove(LIGHT_THEME_CLASS);
      document.body.classList.add(DARK_THEME_CLASS);
    } else if (this.currentTheme === Theme.Light) {
      document.body.classList.remove(DARK_THEME_CLASS);
      document.body.classList.add(LIGHT_THEME_CLASS);
    }
  }
}
