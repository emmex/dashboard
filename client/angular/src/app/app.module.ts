import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbButtonModule, NbGlobalLogicalPosition, NbLayoutModule, NbThemeModule, NbToastrModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from './common/common.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {AdminModule} from './admin/admin.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NbToastrConfig} from '@nebular/theme/components/toastr/toastr-config';


const globalToastrConfig: Partial<NbToastrConfig> = {
  position: NbGlobalLogicalPosition.BOTTOM_START,
  duration: 5000
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule.forRoot(),
    AuthModule.forRoot(),
    UserModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbToastrModule.forRoot(globalToastrConfig),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
