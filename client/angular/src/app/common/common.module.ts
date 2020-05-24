import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {NavigationComponent} from './component/navigation/navigation.component';
import {NbButtonModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    AngularCommonModule,
    NbButtonModule,
    RouterModule
  ]
})
export class CommonModule {
}
