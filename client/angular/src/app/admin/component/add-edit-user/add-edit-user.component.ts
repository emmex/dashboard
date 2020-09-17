import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {FormComponent} from '../../../common/component/form-component';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent extends FormComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<AddEditUserComponent>) {
    super();
  }

  @Input()
  user: User;

  ngOnInit(): void {
    if (this.user == null) {
      this.user = new User();
    }
  }

  submitInternal() {
    this.dialogRef.close(this.user);
  }

  cancel() {
    this.dialogRef.close();
  }

}
