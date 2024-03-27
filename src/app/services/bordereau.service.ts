import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';
import { IBordereau } from '../interfaces/bordereau';

@Injectable({
  providedIn: 'root'
})
export class BordereauService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(bordereau: Partial<IBordereau> | { array: Partial<IBordereau>[] }): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/bordereaux`, bordereau);
  }

  update(bordereau: Partial<IBordereau>, bid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/bordereaux/${bid}`, bordereau);
  }

  read(): Observable<IBordereau[]> {
    return this.http.get<IBordereau[]>(`${this.url}/bordereaux`);
  }

  delete(bid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/bordereaux/${bid}`);
  }
}
