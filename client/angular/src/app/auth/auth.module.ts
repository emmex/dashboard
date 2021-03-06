import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './component/login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';
import {RegisterComponent} from './component/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbFormFieldModule,
    FormsModule,
    NbAlertModule,
    CommonModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: AuthService.sessionFactory,
          deps: [AuthService],
          multi: true
        }
      ]
    };
  }

}
