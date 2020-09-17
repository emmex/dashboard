import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../service/admin.service';
import {Page, PaginationOptions} from '../../../util/paginate/pagination';
import {User} from '../../../model/user.model';
import {NbDialogService} from '@nebular/theme';
import {ConfirmationDialogComponent} from '../../../common/component/confirmation-dialog/confirmation-dialog.component';
import {AddEditUserComponent} from '../add-edit-user/add-edit-user.component';
import {Util} from '../../../util/util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Page<User>;
  pageParams: PaginationOptions;
  isEmpty = Util.isEmpty;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService,
              private dialogService: NbDialogService) {
    this.pageParams = {
      page: this.getQueryParam(route.snapshot.queryParams.page, 1),
      limit: this.getQueryParam(route.snapshot.queryParams.limit, 10)
    };
    this.changeRouteParams();
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.changeRouteParams();
    this.adminService.getUserPage(this.pageParams).subscribe(value => {
      this.users = value;
    });
  }

  remove(id: string) {
    this.dialogService.open(ConfirmationDialogComponent).onClose.subscribe(confirm => {
      if (confirm) {
        this.adminService.removeUser(id).subscribe(() => {
          this.search();
        });
      }
    });
  }

  addEdit(user?: User) {
    const dialogRef = this.dialogService.open(AddEditUserComponent);
    dialogRef.componentRef.instance.user = {...user};
    dialogRef.onClose.subscribe(value => {
      if (value != null) {
        this.adminService.saveUser(value).subscribe(() => {
          this.search();
        });
      }
    });
  }

  private changeRouteParams() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.pageParams,
      });
  }

  private getQueryParam(value: any, _default: number) {
    if (value != null) {
      const v = Number.parseInt(value, 10);
      return Number.isInteger(v) ? v : _default;
    } else {
      return _default;
    }
  }

}
