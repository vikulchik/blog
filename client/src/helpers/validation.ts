import { ValidationOption } from "../interfaces/validation.interface";

export function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function isSame(value1: string, value2: string | number): boolean {
  return value1 === value2;
}

export function isCorrectlyLength(field: string, length: number | string): boolean {
  return field.trim().length >= length;
}

export function isValid(values: Record<string, string>, options: ValidationOption): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  Object.entries(options).forEach(([field, rules]) => {
    rules.forEach((rule) => {
      if (!rule.fn(values[field])) {
        // const currentError = errors[field] || [];
        // currentError.push(rule.msg);
        // errors[field] = currentError;
        errors[field] = [...(errors[field] || []), rule.msg];
      }
    });
  });

  return errors;
}
