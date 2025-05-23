import { Component, Input, Output, EventEmitter, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxRepeatDirective } from 'ngx-repeat';
import { CharacterSheetService } from '../character-sheet.service';
import { IconComponent } from '../../icon/icon.component';
import { IconsToken } from '../../icons';

export interface LevelChangeEvent { level: number };

@Component({
  selector: 'app-skill-level',
  imports: [NgxRepeatDirective, IconComponent],
  templateUrl: './skill-level.component.html',
  styleUrl: './skill-level.component.css'
})
export class SkillLevelComponent implements OnInit {
  @Input() title!: string;
  @Input() level!: number;
  @Input() maxLevel: number = 5;
  @Input() editable: boolean = false;
  @Input() increaseCost: number = 1;

  @Output() change: EventEmitter<LevelChangeEvent> = new EventEmitter();

  private characterSheetService = inject(CharacterSheetService);
  private destroyRef = inject(DestroyRef);
  icons = inject(IconsToken);

  private initialLevel!: number;

  ngOnInit(): void {
    this.initialLevel = this.level;

    this.characterSheetService.revert$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.level = this.initialLevel;
    })
  }

  onPointClick(index: number) {
    if (!this.editable || index < this.initialLevel || this.characterSheetService.experience < this.increaseCost) return;

    if (index === this.level) {
      this.level++;
      this.characterSheetService.decreaseExperience(this.increaseCost);
      this.emitChangeEvent();
      return;
    }

    if (index === this.level - 1) {
      this.level--;
      this.characterSheetService.increaseExperience(this.increaseCost);
      this.emitChangeEvent();
      return;
    }
  }

  emitChangeEvent() {
    this.change.emit({level: this.level});
  }
}
