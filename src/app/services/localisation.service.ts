import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ILocalisation } from '../interfaces/localisation';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(localisation: Partial<ILocalisation>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/localisations`, localisation);
  }

  update(localisation: Partial<ILocalisation>, lid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/localisations/${lid}`, localisation);
  }

  read(): Observable<ILocalisation[]> {
    return this.http.get<ILocalisation[]>(`${this.url}/localisations`);
  }

  delete(lid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/localisations/${lid}`);
  }
}
