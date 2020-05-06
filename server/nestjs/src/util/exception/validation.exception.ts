export class ValidationException extends Error {

  parameterName: string;
  errors: string[];

  constructor(errors?: string[], parameterName?: string) {
    super();
    this.parameterName = parameterName;
    this.errors = errors;
  }

  toString(): string {
    let message = [];
    message.push('Validation exception');
    if (this.parameterName != null) {
      message.push(` of ${this.parameterName}`);
    }
    message.push(`: ${this.errors ? this.errors.join(", ") : '[]'}`);
    // Validation exception [of parameterName]: [errors]
    return message.join('');
  }

}
