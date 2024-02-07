import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isAuthenticated: boolean = false;
	configService = inject(ConfigService);
	httpClient = inject(HttpClient);
	urlG: string = this.configService.urlG;
	private concurentUserSubject: BehaviorSubject<object>;
	public currentUser: Observable<object>;

	constructor() {
		this.concurentUserSubject = new BehaviorSubject<object>(
			JSON.parse(localStorage.getItem('access_token')!)
		);
		this.currentUser = this.concurentUserSubject.asObservable();
	}

	public get currentUserValue(): object {
		return this.concurentUserSubject.value;
	}

	login(credentials: { email: string, password: string }): Observable<any> {
		return this.httpClient.post<any>(this.urlG + '/login', credentials).pipe(
			map((user) => {
				if (user && user.accessToken) {
					localStorage.setItem('access_token', JSON.stringify(user));
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
		location.href = '#/auth'
		this.isAuthenticated = false;
	}
}
