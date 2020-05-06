import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthFormComponent} from '../auth-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthFormComponent implements OnInit {

  user: {
    email?: string,
    password?: string
  } = {};

  constructor(private router: Router, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
  }

  submitInternal() {
    this.authService.login(this.user.email, this.user.password).subscribe(() => {
      this.router.navigate(['']);
    }, error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.errorMessage = 'Incorrect login or password';
      }
      throw error;
    });
  }

}
