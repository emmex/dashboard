import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/service/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private subscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.isAuthenticatedChange.subscribe(value => {
      this.isAuthenticated = value;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
