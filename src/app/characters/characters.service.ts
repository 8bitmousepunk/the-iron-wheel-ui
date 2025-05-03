import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Character, CharacterCompact } from './characters.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiService = inject(ApiService);

  getAll(options?: {compact?: boolean}): Observable<Character[] | CharacterCompact[]> {
    if (options?.compact) {
      return this.apiService.get('characters', {params: { compact: true }}).pipe(
        // delay(3 * 1000) // for dev purposes
      )
    }
    return this.apiService.get('characters').pipe(
      // delay(3 * 1000) // for dev purposes
    );
  }

  get(id: string): Observable<Character> {
    return this.apiService.get(`characters/${id}`).pipe(
      // delay(3 * 1000) // for dev purposes
    );
  }

  patch(id: string, changes: Partial<Character>) {
    return this.apiService.patch(`characters/${id}`, changes).pipe(
      // delay(3 * 1000) // for dev purposes
    );
  }
}
