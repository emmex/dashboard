import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './component/profile/profile.component';
import {UserProfileResolver} from './resolver/user-profile.resolver';
import {EmailConfirmationComponent} from './component/email-confirmation/email-confirmation.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      user: UserProfileResolver
    }
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
