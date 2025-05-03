import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { cloneDeep } from 'es-toolkit';
import { SkillLevelComponent, LevelChangeEvent } from '../skill-level/skill-level.component';
import { Skill } from '../../characters';
import { CharacterSheetService } from '../character-sheet.service';

export type SkillSetChangeEvent = Record<string, number | Skill>;

@Component({
  selector: 'app-skill-set',
  imports: [SkillLevelComponent],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.css'
})
export class SkillSetComponent implements OnInit {
  @Input() skillSet!: Record<string, number | Skill>;
  @Input() editable: boolean = false;
  @Output() skillSetChange: EventEmitter<SkillSetChangeEvent> = new EventEmitter();

  private characterSheetService = inject(CharacterSheetService);

  skillList: {title: string, key: string, subtype?: string, level: number}[] = [];

  ngOnInit(): void {
    this.skillList = Object.keys(this.skillSet).sort().map(key => {
      const skillVal = this.skillSet[key];
      const result: {title: string, key: string, subtype?: string, level: number} = {
        title: key,
        key: key,
        level: 0
      };

      if (typeof skillVal === 'object') {
        result.level = skillVal.level;
        result.subtype = skillVal.specification;
      } else {
        result.level = skillVal;
      }

      return result;
    })
  }

  onLevelChange(key: string, {level}: LevelChangeEvent) {
    const changes = cloneDeep(this.skillSet);

    if (typeof changes[key] === 'object') {
      changes[key].level = level;
    } else {
      changes[key] = level;
    }

    this.emitChangeEvent(changes);
  }

  emitChangeEvent(changes: SkillSetChangeEvent) {
    this.skillSetChange.emit(changes);
  }
}
