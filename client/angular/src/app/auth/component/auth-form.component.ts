import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

export abstract class AuthFormComponent {

  @ViewChild('form', {static: true})
  private form: NgForm;
  errorMessage: string;

  abstract submitInternal();

  getPasswordIcon(input: HTMLInputElement) {
    return input.type === 'text' ? 'eye-outline' : 'eye-off-2-outline';
  }

  toggleShowPassword(input: HTMLInputElement) {
    input.type === 'text' ? input.type = 'password' : input.type = 'text';
  }

  validateInput(input: any) {
    return !(input.invalid && (input.dirty || input.touched));
  }

  submit() {
    if (this.form.status === 'VALID') {
      this.submitInternal();
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty();
      });
    }
  }

}
