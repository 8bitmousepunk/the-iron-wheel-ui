import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {

  private initialExperience: number = 0;
  get experience(): number {
    return this.experience$.value;
  };

  set experience(val: number) {
    this.experience$.next(val);
  }
  experience$: BehaviorSubject<number> = new BehaviorSubject(0);

  revert$: Subject<void> = new Subject<void>();

  initExperience(val: number) {
    this.initialExperience = val;
    this.experience = val;

    this.revert$.subscribe(() => {
      this.experience = this.initialExperience;
    });
  }

  decreaseExperience() {
    if (this.experience === 0) return;
    this.experience--;
  }

  increaseExperience() {
    this.experience++;
  }
}
