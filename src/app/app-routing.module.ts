import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { authGuard } from './guard/auth.guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },
            {path: '**', redirectTo: '/notfound'},
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}