import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  isAuthenticatedChange = new Subject<boolean>();

  constructor(private http: HttpClient) {
    console.log('created!');
  }

  static currentUserFactory = (authService: AuthService) => {
    return () => authService.checkSession();
  }

  private checkSession() {
    this.http.get<boolean>('/auth/check-session').subscribe(response => {
      this.isAuthenticatedChange.next(response);
    });
  }

  login(username: string, password: string): Observable<null> {
    return this.http.post<null>('/auth/login', {username, password})
      .pipe(tap(() => {
        this.isAuthenticatedChange.next(true);
      }));
  }

  logout(): Observable<null> {
    return this.http.get<null>('/auth/logout')
      .pipe(tap(() => {
        this.isAuthenticatedChange.next(false);
      }));
  }

  ngOnDestroy(): void {
    this.isAuthenticatedChange.complete();
  }

}
