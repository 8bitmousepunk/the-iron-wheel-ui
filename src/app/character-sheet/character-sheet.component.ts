import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, BehaviorSubject, map, switchMap, tap, delay } from 'rxjs';
import { CharactersService, CharacterCompact, Character } from '../characters';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit {
  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);

  characters$!: Observable<CharacterCompact[]>;
  id$!: Observable<string>;
  character$!: Observable<Character>;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    this.characters$ = this.charactersService.getAll({compact: true});
    this.id$ = this.route.params.pipe(map(({id}) => id));
    this.character$ = this.id$.pipe(
      tap(() => this.isLoading$.next(true)),
      switchMap(id => this.charactersService.get(id).pipe(
        delay(3 * 1000) // TODO: remove it on the production
      )),
      tap(() => this.isLoading$.next(false))
    );
  }
}
