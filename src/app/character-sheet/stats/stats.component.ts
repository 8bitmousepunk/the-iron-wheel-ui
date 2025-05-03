import { Component, Input, Output, OnInit, EventEmitter, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxRepeatDirective } from 'ngx-repeat';
import { Character, HealthPoints, HealthPoint } from '../../characters';
import { StatsHealthIconPipe } from './stats-health-icon.pipe';
import { CharacterSheetService } from '../character-sheet.service';

export type StatsChangeEvent = Partial<Pick<Character, 'health' | 'integrity' | 'willpower'>>;

@Component({
  selector: 'app-stats',
  imports: [AngularSvgIconModule, NgxRepeatDirective, StatsHealthIconPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  @Input() character!: Character;
  @Output() statsChange: EventEmitter<StatsChangeEvent> = new EventEmitter<StatsChangeEvent>();

  private characterSheetService = inject(CharacterSheetService);
  private destroyRef = inject(DestroyRef);

  private _changes: StatsChangeEvent = {};

  get health(): HealthPoints {
    return this._health;
  }
  set health(val: HealthPoints) {
    this._health = val;
    this.emitChanges({health: this._health});
  }
  private _health!: HealthPoints;

  get willpower(): number{
    return this._willpower;
  };
  set willpower(val: number) {
    this._willpower = val;
    this.emitChanges({willpower: this._willpower});
  }
  private _willpower!: number;

  get integrity(): number {
    return this._integrity;
  };
  set integrity(val: number) {
    this._integrity = val;
    this.emitChanges({integrity: this._integrity});
  }
  private _integrity!: number;

  ngOnInit(): void {
    this.initStats();

    this.characterSheetService.revert$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.initStats();
    });
  }

  initHealt(): void {
    this._health = Array.from(this.character.health);
  }

  initWillpower(): void {
    this._willpower = this.character.willpower;
  }

  initIntegrity(): void {
    this._integrity = this.character.integrity;
  }

  initStats() {
    this.initHealt();
    this.initWillpower();
    this.initIntegrity();
  }


  onHealthIconCLick(index: number) {
    const allHealthTypes = Object.values(HealthPoint)
    let nextHealthTypeIdx = allHealthTypes.indexOf(this.health[index]) + 1;
    if (nextHealthTypeIdx >= allHealthTypes.length) nextHealthTypeIdx = 0;
    const nextHealthType = allHealthTypes[nextHealthTypeIdx];

    this.health[index] = nextHealthType;

    this.emitChanges({health: Array.from(this.health)});
  }

  onWillpowerIconClick(index: number) {
    if (index === this.willpower - 1) {
      this.willpower--;
    } else if (index === this.willpower) {
      this.willpower++;
    }
  }

  onIntegrityIconClick(index: number) {
    if (index === this.integrity - 1) {
      this.integrity--;
    } else if (index === this.integrity) {
      this.integrity++;
    }
  }

  emitChanges(changes: StatsChangeEvent) {
    this._changes = {
      ...this._changes,
      ...changes
    }
    this.statsChange.emit(this._changes);
  }
}
