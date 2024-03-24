import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ISite } from '../interfaces/site';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(site: Partial<ISite> | { array: Partial<ISite>[] }): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/sites`, site);
  }

  update(site: Partial<ISite>, sid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/sites/${sid}`, site);
  }

  read(): Observable<ISite[]> {
    return this.http.get<ISite[]>(`${this.url}/sites`);
  }

  delete(sid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/sites/${sid}`);
  }
}
