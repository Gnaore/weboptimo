import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IBonCommande } from '../interfaces/bon-commande';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class BonCommandeService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(bonCommande: Partial<IBonCommande>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/bonCommandes`, bonCommande);
  }

  update(bonCommande: Partial<IBonCommande>, bcid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/bonCommandes/${bcid}`, bonCommande);
  }

  read(): Observable<IBonCommande[]> {
    return this.http.get<IBonCommande[]>(`${this.url}/bonCommandes`);
  }

  delete(bcid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/bonCommandes/${bcid}`);
  }
}
