import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, merge, map, switchMap, tap, delay } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CharactersService, CharacterCompact, Character, CharacterChanges } from '../characters';
import { CharacterSheetService } from './character-sheet.service';
import { HeaderComponent } from '../header/header.component';
import { StatsComponent, StatsChangeEvent } from './stats/stats.component';

@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, RouterLink, RouterLinkActive, HeaderComponent, StatsComponent, AngularSvgIconModule],
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
      switchMap(id => this.charactersService.get(id).pipe(
        delay(3 * 1000) // TODO: remove it on the production
      )),
      tap(() => this.isLoading = false)
    );
  }

  onStatsChange(changes: StatsChangeEvent): void {
    this.changes = {
      ...this.changes,
      ...changes
    };
    this.isChanged = true;
  }

  onRevert(): void {
    this.changes = {};
    this.isChanged = false;
    this.characterSheetService.revert$.next();
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
