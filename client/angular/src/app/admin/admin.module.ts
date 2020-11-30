import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {UserListComponent} from './component/user-list/user-list.component';
import {AdminService} from './service/admin.service';
import {NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {CommonModule} from '../common/common.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AddEditUserComponent} from './component/add-edit-user/add-edit-user.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UserListComponent,
    AddEditUserComponent
  ],
  imports: [
    AngularCommonModule,
    AdminRoutingModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    CommonModule,
    NgbPaginationModule,
    NbFormFieldModule,
    FormsModule,
    NbInputModule,
    NbAlertModule,
    NbSelectModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {
}
