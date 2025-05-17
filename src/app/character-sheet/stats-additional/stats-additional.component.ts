import { Component, Input, Output, EventEmitter, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NgxRepeatDirective } from 'ngx-repeat';
import { cloneDeep } from 'es-toolkit';
import { Character, Armor } from '../../characters';
import { CharacterSheetService } from '../../character-sheet/character-sheet.service';
import { IconComponent } from '../../icon/icon.component';
import { IconsToken } from '../../icons'

export type StatsAdditionalChangeEvent = Partial<Pick<Character, 'beats' | 'armor'>>;

export const AdditionalStatsList: Array<{ key: keyof Pick<Character, 'size' | 'speed' | 'defense' | 'armor' | 'initiative'>, label: string }> = [
  { key: 'size', label: 'Size'},
  { key: 'speed', label: 'Speed'},
  { key: 'defense', label: 'Defense'},
  { key: 'initiative', label: 'Initiative'},
]

@Component({
  selector: 'app-stats-additional',
  imports: [CommonModule, IconComponent, NgxRepeatDirective],
  templateUrl: './stats-additional.component.html',
  styleUrl: './stats-additional.component.css'
})
export class StatsAdditionalComponent implements OnInit {
  @Input() character!: Character;
  @Output() statsAdditionalChange: EventEmitter<StatsAdditionalChangeEvent> = new EventEmitter();

  private characterSheetService = inject(CharacterSheetService);
  private destroyRef = inject(DestroyRef);
  icons = inject(IconsToken);

  statslist = AdditionalStatsList;
  beats!: number;
  maxBeats: number = 5;
  initialBeats!: number;
  experience$ = this.characterSheetService.experience$;
  armor!: Armor;

  ngOnInit(): void {
    this.initCharacterBeats();
    this.initArmor();

    this.characterSheetService.revert$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.initCharacterBeats();
      this.initArmor();
    })
  }

  initCharacterBeats() {
    this.initialBeats = this.character.beats;
    this.beats = this.character.beats;
  }

  initArmor() {
    this.armor = cloneDeep(this.character.armor);
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

  updateArmor(type: keyof Armor, val: number) {
    if (this.armor[type] === 0 && val < 0) return;
    this.armor[type] += val;
    this.emitChanges();
  }

  emitChanges() {
    this.statsAdditionalChange.emit({beats: this.beats, armor: this.armor});
  }
}
