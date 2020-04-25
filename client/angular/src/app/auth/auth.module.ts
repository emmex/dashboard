import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './component/login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';


@NgModule({
  declarations: [LoginComponent],
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
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
