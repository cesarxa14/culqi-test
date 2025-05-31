import {
  IsNotEmpty,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Custom validator para el rango del año
@ValidatorConstraint({ name: 'IsValidExpirationYear', async: false })
export class IsValidExpirationYearConstraint implements ValidatorConstraintInterface {
  validate(year: string, args: ValidationArguments) {
    if (!/^\d{4}$/.test(year)) return false;
    const currentYear = new Date().getFullYear();
    const numericYear = parseInt(year, 10);
    return numericYear >= currentYear && numericYear <= currentYear + 5;
  }

  defaultMessage(args: ValidationArguments) {
    return `Expiration year must be a 4-digit year between ${new Date().getFullYear()} and ${new Date().getFullYear() + 5}`;
  }
}
