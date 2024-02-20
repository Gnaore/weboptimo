import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';
import { IFamille } from '../interfaces/famille';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(famille: Partial<IFamille>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/familles`, famille);
  }

  update(famille: Partial<IFamille>, fid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/familles/${fid}`, famille);
  }

  read(): Observable<IFamille[]> {
    return this.http.get<IFamille[]>(`${this.url}/familles`);
  }

  delete(fid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/familles/${fid}`);
  }
}
