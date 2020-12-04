import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {NavigationComponent} from './component/navigation/navigation.component';
import {NbButtonModule, NbCardModule, NbDialogModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {ConfirmationDialogComponent} from './component/confirmation-dialog/confirmation-dialog.component';
import {FormsModule} from '@angular/forms';
import {GlobalErrorHandler} from './handler/global-error.handler';


@NgModule({
  declarations: [
    NavigationComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    NavigationComponent,
  ],
  imports: [
    AngularCommonModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    RouterModule,
    NbCardModule,
    FormsModule
  ]
})
export class CommonModule {

  static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
        }
      ]
    };
  }

}
