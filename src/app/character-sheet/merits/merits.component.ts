import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { cloneDeep } from 'es-toolkit';
import { Character, Merits } from '../../characters';
import { SkillLevelComponent, LevelChangeEvent } from '../skill-level/skill-level.component';

export type MeritsChangeEvent = Partial<Pick<Character, 'merits'>>

@Component({
  selector: 'app-merits',
  imports: [SkillLevelComponent],
  templateUrl: './merits.component.html',
  styleUrl: './merits.component.css'
})
export class MeritsComponent implements OnInit {
  @Input() character!: Character;
  @Output() meritsChange: EventEmitter<MeritsChangeEvent> = new EventEmitter();

  merits!: Merits;

  ngOnInit(): void {
    this.merits = cloneDeep(this.character.merits);
  }

  onMeritChange(index: number, event: LevelChangeEvent) {
    this.merits[index].level = event.level;

    this.meritsChange.emit({merits: this.merits});
  }
}
