import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CharactersService, Character } from '../characters';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  private charactersService = inject(CharactersService);

  characters$!: Observable<Character[]>;

  ngOnInit(): void {
    this.characters$ = this.charactersService.getAll();
  }
}
