import { Component, Input, Output, EventEmitter, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxRepeatDirective } from 'ngx-repeat';
import { Character } from '../../characters';
import { CharacterSheetService } from '../../character-sheet/character-sheet.service';

export type StatsAdditionalChangeEvent = Partial<Pick<Character, 'beats'>>

export const AdditionalStatsList: Array<{ key: keyof Pick<Character, 'size' | 'speed' | 'defense' | 'armor' | 'initiative'>, label: string }> = [
  { key: 'size', label: 'Size'},
  { key: 'speed', label: 'Speed'},
  { key: 'defense', label: 'Defense'},
  { key: 'armor', label: 'Armor'},
  { key: 'initiative', label: 'Initiative'},
]

@Component({
  selector: 'app-stats-additional',
  imports: [CommonModule, AngularSvgIconModule, NgxRepeatDirective],
  templateUrl: './stats-additional.component.html',
  styleUrl: './stats-additional.component.css'
})
export class StatsAdditionalComponent implements OnInit {
  @Input() character!: Character;
  @Output() statsAdditionalChange: EventEmitter<StatsAdditionalChangeEvent> = new EventEmitter();

  private characterSheetService = inject(CharacterSheetService);
  private destroyRef = inject(DestroyRef);

  statslist = AdditionalStatsList;
  beats!: number;
  maxBeats: number = 5;
  initialBeats!: number;
  experience$ = this.characterSheetService.experience$;

  ngOnInit(): void {
    this.initCharacterBeats();

    this.characterSheetService.revert$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.initCharacterBeats();
    })
  }

  initCharacterBeats() {
    this.initialBeats = this.character.beats;
    this.beats = this.character.beats;
  }

  onBeatClick(index: number) {
    if (index < this.initialBeats && index > this.beats) return;

    if (index === this.beats) {
      this.beats++;
      this.emitChanges();
      return;
    }

    if (index === this.beats - 1) {
      this.beats--;
      this.emitChanges();
      return;
    }
  }

  onRaiseClick() {
    this.beats = 0;
    this.initialBeats = 0;
    this.characterSheetService.increaseExperience();
    this.emitChanges();
  }

  emitChanges() {
    this.statsAdditionalChange.emit({beats: this.beats});
  }
}
