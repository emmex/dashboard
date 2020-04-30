import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('form', {static: true})
  private form: NgForm;
  private showPassword = false;
  showAuthError = false;
  user: {
    email?: string,
    password?: string
  } = {};

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  getPasswordIcon() {
    return this.showPassword ? 'eye-outline' : 'eye-off-2-outline';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  validateInput(input: NgModel) {
    return !(input.invalid && (input.dirty || input.touched));
  }


  submit() {
    if (this.form.status === 'VALID') {
      this.authService.login(this.user.email, this.user.password).subscribe(() => {
        this.router.navigate(['']);
      }, error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.showAuthError = true;
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty();
      });
    }
  }
}
