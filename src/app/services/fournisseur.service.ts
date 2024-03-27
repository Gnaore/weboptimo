import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { IFournisseur } from '../interfaces/fournisseur';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(fournisseur: Partial<IFournisseur>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/fournisseurs`, fournisseur);
  }

  update(fournisseur: Partial<IFournisseur>, fid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/fournisseurs/${fid}`, fournisseur);
  }

  read(): Observable<IFournisseur[]> {
    return this.http.get<IFournisseur[]>(`${this.url}/fournisseurs`);
  }

  delete(fid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/fournisseurs/${fid}`);
  }
}
