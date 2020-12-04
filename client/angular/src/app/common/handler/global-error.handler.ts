import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NbToastrConfig, NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler extends ErrorHandler {

  private defaultTitle = 'Error';
  private errorMsgConfig: Partial<NbToastrConfig> = {
    status: 'danger'
  };

  private loginUrl = '/api/auth/login';
  private registerUrl = '/api/auth/register';

  constructor(private router: Router, private toastrService: NbToastrService) {
    super();
  }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else if (error.rejection != null && error.rejection instanceof HttpErrorResponse) {
      this.handleHttpError(error.rejection);
    } else {
      super.handleError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    if (!navigator.onLine) {
      this.toastrService.show('Internet connection lost', this.defaultTitle, this.errorMsgConfig);
    } else {
      switch (error.status) {
        case 401:
          if (!error.url.endsWith(this.loginUrl)) {
            this.toastrService.show('You are not logged in', this.defaultTitle, this.errorMsgConfig);
          }
          break;
        case 400 :
          if (!error.url.endsWith(this.registerUrl)) {
            this.toastrService.show(error.error.message, error.statusText, this.errorMsgConfig);
          }
          break;
        case 403 :
          this.toastrService.show('Insufficient access permissions', this.defaultTitle, this.errorMsgConfig);
          break;
        case 504:
          this.toastrService.show('Server does not respond', error.statusText, this.errorMsgConfig);
          break;
        default:
          const msg = error?.error?.message || error.message;
          this.toastrService.show(msg, error.statusText, this.errorMsgConfig);
      }
    }
  }

}
