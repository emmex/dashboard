import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page, PaginationOptions} from '../../util/paginate/pagination';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getUserPage(options: PaginationOptions): Observable<Page<User>> {
    const httpParams = new HttpParams()
      .append('page', String(options.page))
      .append('limit', String(options.limit));
    return this.http.get<Page<User>>('/api/admin/users', {params: httpParams});
  }

  removeUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/admin/${id}`);
  }

  saveUser(user: User): Observable<void> {
    return user.id != null
      ? this.http.post<void>(`/api/admin/${user.id}`, user)
      : this.http.put<void>('/api/admin/add-user', user);
  }

  getRolesList(): Observable<string[]> {
    return this.http.get<string[]>('/api/admin/roles');
  }

}
