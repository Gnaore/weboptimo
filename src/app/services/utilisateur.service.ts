import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IUtilisateur } from '../interfaces/utilisateur';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(user: Partial<IUtilisateur>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/users`, user);
  }

  update(user: Partial<IUtilisateur>, uid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/users/${uid}`, user);
  }

  read(): Observable<IUtilisateur[]> {
    return this.http.get<IUtilisateur[]>(`${this.url}/users`);
  }

  delete(gid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/users/${gid}`);
  }
}
