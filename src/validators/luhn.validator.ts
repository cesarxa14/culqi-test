import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'luhn', async: false })
export class LuhnValidator implements ValidatorConstraintInterface {
  validate(cardNumber: string, _args: ValidationArguments): boolean {
    const str = cardNumber.toString();
    let sum = 0;
    let shouldDouble = false;

    for (let i = str.length - 1; i >= 0; i--) {
      let digit = parseInt(str[i], 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Card number is invalid (does not pass Luhn check)';
  }
}
