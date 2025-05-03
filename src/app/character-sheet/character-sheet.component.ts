import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, merge, map, switchMap, tap } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { cloneDeep } from 'es-toolkit';
import { CharactersService, CharacterCompact, Character, CharacterChanges } from '../characters';
import { CharacterSheetService } from './character-sheet.service';
import { HeaderComponent } from '../header/header.component';
import { StatsComponent, StatsChangeEvent } from './stats/stats.component';
import { MeritsComponent, MeritsChangeEvent } from './merits/merits.component';
import { StatsAdditionalComponent, StatsAdditionalChangeEvent } from './stats-additional/stats-additional.component';
import { SkillSetComponent, SkillSetChangeEvent } from './skill-set/skill-set.component';

@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, RouterLink, RouterLinkActive, HeaderComponent, StatsComponent, MeritsComponent, AngularSvgIconModule, StatsAdditionalComponent, SkillSetComponent],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit {
  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);
  private characterSheetService = inject(CharacterSheetService);
  private destroyRef = inject(DestroyRef);

  characters$!: Observable<CharacterCompact[]>;
  id$!: Observable<string>;
  character$!: Observable<Character>;

  changes: CharacterChanges = {};
  isChanged: boolean = false;

  isLoading: boolean = false;
  isSaving: boolean = false;

  refresh$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.characters$ = this.charactersService.getAll({compact: true});
    this.id$ = this.route.params.pipe(map(({id}) => id));
    this.character$ = merge(this.id$, this.refresh$.pipe(switchMap(() => this.id$))).pipe(
      tap(() => this.isLoading = true),
      switchMap(id => this.charactersService.get(id)),
      tap(character => {
        this.characterSheetService.initExperience(character.experience),
        this.isLoading = false;
        this.changes = {};
        this.isChanged = false
      })
    );

    this.characterSheetService.experience$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(experience => {
      this.commonChangeHanlder({ experience });
    })
  }

  onStatsChange(changes: StatsChangeEvent): void {
    this.commonChangeHanlder(changes);
  }

  onMeritsChange(changes: MeritsChangeEvent) {
    this.commonChangeHanlder(changes);
  }

  onStatsAdditionalChange(changes: StatsAdditionalChangeEvent) {
    this.commonChangeHanlder(changes);
  }

  onSkillSetChange(type: string, changes: SkillSetChangeEvent) {
    this.commonChangeHanlder({
      [`skills.${type}`]: changes
    })
  }

  commonChangeHanlder(changes: Partial<Character>) {
    this.changes = {
      ...this.changes,
      ...changes
    };
    this.isChanged = true;
  }

  onRevert(): void {
    this.characterSheetService.revert$.next();
    this.changes = {};
    this.isChanged = false;
  }

  onSave(id: string): void {
    this.isSaving = true;
    this.charactersService.patch(id, this.changes).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isSaving = false;
      this.changes = {};
      this.isChanged = false;

      this.refresh$.next();
    })
  }
}
