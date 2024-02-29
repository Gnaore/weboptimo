import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPermission } from '../interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  read(): Observable<IPermission[]> {
    return this.http.get<IPermission[]>(`${this.url}/permissions`);
  }
}
