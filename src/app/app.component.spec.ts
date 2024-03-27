/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopbarComponent } from './admin/composants/app.topbar.component';
import { AppSideBarComponent } from './admin/composants/app.sidebar.component';
import { AppFooterComponent } from './admin/composants/app.footer.component';
import {AppSidebartabcontentComponent} from './admin/composants/app.sidebartabcontent.component';
import { AppMenuComponent } from './admin/composants/app.menu.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ AppComponent,
            AppMainComponent,
                AppTopbarComponent,
                AppSideBarComponent,
                AppSidebartabcontentComponent,
                AppMenuComponent,
                AppFooterComponent
            ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
