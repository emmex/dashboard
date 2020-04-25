import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './component/profile/profile.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {NbButtonModule} from '@nebular/theme';


@NgModule({
  declarations: [ProfileComponent, NavigationComponent],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NbButtonModule
  ]
})
export class UserModule {
}
