import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IZone } from '../interfaces/zone';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(zone: Partial<IZone>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/zones`, zone);
  }

  update(zone: Partial<IZone>, zid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/zones/${zid}`, zone);
  }

  read(): Observable<IZone[]> {
    return this.http.get<IZone[]>(`${this.url}/zones`);
  }

  delete(zid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/zones/${zid}`);
  }
}
