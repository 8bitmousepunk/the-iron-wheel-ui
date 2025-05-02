import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {

  revert$: Subject<void> = new Subject<void>();

  constructor() { }
}
