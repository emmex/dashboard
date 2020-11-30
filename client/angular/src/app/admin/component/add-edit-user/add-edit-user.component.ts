import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {FormComponent} from '../../../common/component/form-component';
import {NbDialogRef} from '@nebular/theme';
import {AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent extends FormComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<AddEditUserComponent>, private adminService: AdminService) {
    super();
  }

  @Input()
  user: User;
  roles: string[];
  rolesLoading = false;

  ngOnInit(): void {
    if (this.user == null) {
      this.user = new User();
    }
    this.loadRoles();
  }

  private loadRoles() {
    this.rolesLoading = true;
    this.adminService.getRolesList().subscribe(value => {
      this.roles = value;
      this.rolesLoading = false;
    }, error => {
      this.rolesLoading = false;
      throw error;
    });
  }

  submitInternal() {
    this.dialogRef.close(this.user);
  }

  cancel() {
    this.dialogRef.close();
  }

}
