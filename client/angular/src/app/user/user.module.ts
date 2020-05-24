import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './component/profile/profile.component';
import {NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule, NbTooltipModule} from '@nebular/theme';
import {EmailConfirmationComponent} from './component/email-confirmation/email-confirmation.component';


@NgModule({
  declarations: [ProfileComponent, EmailConfirmationComponent],
  exports: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbTooltipModule,
    NbAlertModule,
    NbSpinnerModule
  ]
})
export class UserModule {
}
