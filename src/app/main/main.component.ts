import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CharactersService, CharacterCompact } from '../characters';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  private charactersService = inject(CharactersService);

  characters$!: Observable<CharacterCompact[]>;

  ngOnInit(): void {
    this.characters$ = this.charactersService.getAll({compact: true});
  }
}
