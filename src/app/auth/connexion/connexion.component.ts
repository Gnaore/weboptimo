import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.component.html',
	styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
	private authFormBuilder = inject(FormBuilder);
	private authService = inject(AuthService);
	authForm: FormGroup;
	isLoading: boolean = false;
	isError: boolean = false;

	ngOnInit() {
		this.formInit();
	}

	formInit() {
		this.authForm = this.authFormBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	login() {
		this.isError = false;
		this.isLoading = true;
		const credentials: { email: string, password: string } = {
			"email": this.authForm.value.email,
			"password": this.authForm.value.password
		}
		this.authService.login(credentials).subscribe(
			{
				next: (ret) => {
					this.isLoading = false;
					if (ret.accessToken) {
						location.href = '#/admin';
					}
				},
				error: (err) => {
					this.isLoading = false;
					this.isError = true;
					localStorage.clear();
				}
			}
		);
	}
}
