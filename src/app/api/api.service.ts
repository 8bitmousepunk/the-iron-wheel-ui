import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  get(path: string, options?: {
    params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>
  }): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${path}`, options);
  }

  post(path: string, body: any | null, options?: {
    params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>
  }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/${path}`, body, options);
  }

  patch(path: string, body: any | null, options?: {
    params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>
  }): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/${path}`, body, options);
  }

  delete(path: string, options?: {
    params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>
  }): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/${path}`, options);
  }
}
