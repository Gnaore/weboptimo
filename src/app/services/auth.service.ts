import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserSubject!: BehaviorSubject<object>;
  public accessToken!: Observable<object>;
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  getLoggedUser: Object;

  constructor() {
    this.getLoggedUser = JSON.parse(sessionStorage.getItem('token')!);
    this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser);
    this.accessToken = this.loggedUserSubject.asObservable();
  }

  loginUser(credentials: FormData): Observable<any> {
    return this.http.post<any>(`${this.configService.urlG}/auth/login.php`, credentials)
      .pipe(map(response => {
        sessionStorage.setItem('token', JSON.stringify(response.data));
        this.loggedUserSubject.next(response);
        return response;
      }));
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    this.loggedUserSubject.next(null!);
    location.reload();
  }

  get currentUser(): any | null {
    let token = sessionStorage.getItem('token');
    if (!token) return null;
    return jwtDecode(token);
  }

  public get accessTokenValue() {
    return this.loggedUserSubject.value;
  }
}
