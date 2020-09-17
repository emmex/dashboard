import {ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

export abstract class FormComponent {

  @ViewChild('form', {static: true})
  private form: NgForm;

  abstract submitInternal();

  validateInput(input: NgModel) {
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
