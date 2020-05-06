import {isEmpty, validate as classValidatorValidate} from 'class-validator';
import {ValidationException} from './exception/validation.exception';
import {isObject} from './util';

export const Validate = (...validationParameterNames: string[]) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: unknown[]) {
    const paramNames = getParameterNames(originalMethod);
    for (let i = 0; i < args.length; i++) {
      if (validationParameterNames.length == 0 || validationParameterNames.find(value => value === paramNames[i]))
        await validate(args[i], paramNames[i]);
    }
    return originalMethod.apply(this, args);
  }
  return descriptor;
}

export const validate = async (target: Object, parameterName): Promise<void> => {
  if (target == null) {
    throw new ValidationException([`${parameterName} should be represented`]);
  }
  if (isObject(target)) {
    let errors = await classValidatorValidate(target, {validationError: {target: false}});
    if (errors.length > 0) {
      throw new ValidationException(errors.map(value => Object.values(value.constraints).join(", ")), parameterName);
    }
  } else if (isEmpty(target)) {
    throw new ValidationException([`${parameterName} should not be empty`])
  }
}

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParameterNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null)
    result = [];
  return result;
}
