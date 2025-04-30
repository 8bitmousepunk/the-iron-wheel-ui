import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './characters.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiService = inject(ApiService);

  getAll(): Observable<Character[]> {
    return this.apiService.get('characters');
  }
}
