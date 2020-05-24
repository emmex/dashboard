import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>('/api/user/profile');
  }

  sendConfirmationRequest(): Observable<void> {
    return this.http.get<void>('/api/user/send-email-confirmation');
  }

  confirmEmail(uuid: string, email: string): Observable<void> {
    return this.http.post<void>(`/api/user/confirm-email/${uuid}`, {email});
  }

}
