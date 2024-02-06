import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  urlG: string;
  private concurentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<object>;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private router: Router ) {
    this.urlG = this.configService.urlG;
    this.concurentUserSubject = new BehaviorSubject<object>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.concurentUserSubject.asObservable();
  }

  public get currentUserValue(): object {
    return this.concurentUserSubject.value;
  }

  login(data: any): Observable<any> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.post<any>(this.urlG + '/login', data, httpOptions).pipe(
      map((user) => {
      
          if (user && user.accessToken) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.concurentUserSubject.next(user);
            this.isAuthenticated = true;
          } else {
            this.isAuthenticated = false;
          }

          return user;
        })
      );
  }


  logout() {
    // Logique pour se déconnecter, comme effacer le jeton d'authentification et rediriger l'utilisateur vers la page de connexion
    localStorage.removeItem('currentUser');
    this.concurentUserSubject.next({});
    this.router.navigate(['/auth'])
   // window.location.href = '/auth';
    this.isAuthenticated = false;
  }

}
