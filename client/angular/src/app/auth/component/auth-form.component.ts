import {FormComponent} from '../../common/component/form-component';

export abstract class AuthFormComponent extends FormComponent {

  errorMessage: string;

  getPasswordIcon(input: HTMLInputElement) {
    return input.type === 'text' ? 'eye-outline' : 'eye-off-2-outline';
  }

  toggleShowPassword(input: HTMLInputElement) {
    input.type === 'text' ? input.type = 'password' : input.type = 'text';
  }

}
