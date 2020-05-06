import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/user.model';
import {AuthFormComponent} from '../auth-form.component';
import {AbstractControl, NgModel, ValidatorFn} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthFormComponent implements OnInit {

  @ViewChild('confirmedPassword', {static: true})
  confirmedPasswordInput: NgModel;
  confirmedPasswordValue: string;
  user: User = new User();

  constructor(private router: Router, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.confirmedPasswordInput.control.setValidators(this.confirmedPasswordValidator());
  }

  private confirmedPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value !== this.user.password ? {passwordUnconfirmed: true} : null;
    };
  }

  submitInternal() {
    this.authService.register(this.user).subscribe(() => {
      this.authService.login(this.user.email, this.user.password).subscribe(() => {
        this.router.navigate(['']);
      });
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = error.error.message;
      }
      throw error;
    });
  }

}
