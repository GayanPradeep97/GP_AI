import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `Min Length is ${minLength}`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `Max Length is ${maxLength}`,
        },
      };
    };
  }

  static override pattern(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Password must contain at least 8 characters with one Uppercase, one simple case, one number and one special character`,
        },
      };
    };
  }
  static patternURL(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Enter correct URL`,
        },
      };
    };
  }
  static customEmail(pattern: any, name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `${name} must be valid`,
        },
      };
    };
  }

  static customRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Please input your ${name}`,
        },
      };
    };
  }
  static customConfirmPasswordRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Please confirm your ${name}`,
        },
      };
    };
  }

  static monthValidator(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;
      if (value && (isNaN(value) || value < 1 || value > 12)) {
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `Month should be valid`,
          },
        };
      }
      return null;
    };
  }
  static characterLength(name: string, maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (
        control.value == null ||
        control.value == '' ||
        Validators.maxLength(maxLength)(control) === null
      ) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${maxLength}`,
          en: `${name} should have less than ${maxLength} characters`,
        },
      };
    };
  }
  static exactLength(name: string, length: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value: string = control?.value;

      if (value && value.toString().length !== length) {
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `${name} should be ${length} digits`,
          },
        };
      }
      return null;
    };
  }
  static contactNumberLength(name: string, length: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value: string = control?.value;

      if (value && value.toString().length > length) {
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `${name} should be less than ${length} digits`,
          },
        };
      }
      return null;
    };
  }

  static alphanumericPattern(
    minLength: number = 5,
    maxLength: number = 12,
    pattern: RegExp = /^[a-zA-Z0-9 ]+$/
  ): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (
        control.value == null ||
        control.value === '' ||
        (Validators.pattern(pattern)(control) === null &&
          Validators.maxLength(maxLength)(control) === null &&
          Validators.minLength(minLength)(control) === null)
      ) {
        return null;
      }

      return {
        alphanumeric: {
          'zh-cn': `请输入5到12个字母、数字或空格的组合`,
          en: `Enter ${minLength} to ${maxLength} alphanumeric characters`,
        },
      };
    };
  }
  // static alphanumericPatternWithoutSpace(
  //   minLength: number = 5,
  //   maxLength: number = 20,
  //   pattern: RegExp = /^[a-zA-Z0-9]+$/
  // ): ValidatorFn {
  //   console.log('input values minLength', minLength);
  //   console.log('input values maxLength', maxLength);
  //   console.log('input values pattern', pattern);
  //   // Alphanumeric pattern

  //   return (control: AbstractControl): MyValidationErrors | null => {
  //     if (
  //       control.value == null ||
  //       control.value == '' ||
  //       (Validators.pattern(pattern)(control) === null &&
  //         Validators.maxLength(maxLength)(control) === null &&
  //         Validators.minLength(minLength)(control) === null)
  //     ) {
  //       // If the alphanumeric pattern validation passes, return null (no validation error).
  //       return null;
  //     }

  //     // If the alphanumeric pattern validation fails, return a validation error object.
  //     return {
  //       alphanumeric: {
  //         'zh-cn': `请输入5到20个字母和数字的组合`,
  //         en: `Enter ${minLength} to ${maxLength} alphanumeric characters`,
  //       },
  //     };
  //   };
  // }

  static specificPattern(): ValidatorFn {
    const pattern: RegExp = /^[a-zA-Z]{4}[a-zA-Z0-9]{7}$/;

    return (control: AbstractControl): MyValidationErrors | null => {
      if (
        control.value == null ||
        control.value === '' ||
        Validators.pattern(pattern)(control) === null
      ) {
        return null;
      }

      return {
        specificPattern: {
          'zh-cn': `请输入4个字母，后跟7个字母或数字`,
          en: `Enter exactly 4 letters followed by 7 alphanumeric characters`,
        },
      };
    };
  }

  static alphanumericPatternWithoutSpace(
    minLength: number = 8,
    maxLength: number = 11,
    pattern: RegExp = /^[a-zA-Z0-9]+$/
  ): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value || '';

      // Check if value meets pattern, minLength, and maxLength
      const isPatternValid = Validators.pattern(pattern)(control) === null;
      const isMinLengthValid =
        Validators.minLength(minLength)(control) === null;
      const isMaxLengthValid =
        Validators.maxLength(maxLength)(control) === null;

      if (
        value === '' ||
        (isPatternValid && isMinLengthValid && isMaxLengthValid)
      ) {
        return null;
      }

      // Return custom error message if validation fails
      return {
        alphanumericWithoutSpace: {
          'zh-cn': `请输入8到11个字母和数字的组合`,
          en: `Enter ${minLength} to ${maxLength} alphanumeric characters`,
        },
      };
    };
  }
}
