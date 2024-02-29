import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';
import { IGroupe } from '../interfaces/groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(groupe: Partial<IGroupe>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/roles`, groupe);
  }

  update(groupe: Partial<IGroupe>, gid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/roles/${gid}`, groupe);
  }

  read(): Observable<IGroupe[]> {
    return this.http.get<IGroupe[]>(`${this.url}/roles`);
  }

  delete(gid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/roles/${gid}`);
  }
}
