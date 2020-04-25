import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbButtonModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from './common/common.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/service/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AuthService.currentUserFactory,
      deps: [AuthService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
