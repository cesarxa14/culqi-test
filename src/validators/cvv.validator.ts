import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'cvv', async: false })
export class CvvValidator implements ValidatorConstraintInterface {
  validate(cvv: number, args: ValidationArguments): boolean {
    const object = args.object as any;
    const cardNumber: string = object.card_number?.toString();
    const cvvStr = cvv?.toString();

    if (!cardNumber || !cvvStr) return false;

    // AMEX
    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      return cvvStr.length === 4;
    }

    // VISA (starts with 4)
    if (cardNumber.startsWith('4')) {
      return cvvStr.length === 3;
    }

    // MasterCard (starts with 51–55 or 2221–2720)
    const first2 = parseInt(cardNumber.slice(0, 2), 10);
    const first4 = parseInt(cardNumber.slice(0, 4), 10);

    if (
      (first2 >= 51 && first2 <= 55) ||
      (first4 >= 2221 && first4 <= 2720)
    ) {
      return cvvStr.length === 3;
    }

    // Por defecto, solo permitimos CVV de 3 o 4
    return cvvStr.length >= 3 && cvvStr.length <= 4;
  }

  defaultMessage(args: ValidationArguments): string {
    const object = args.object as any;
    const cardNumber: string = object.card_number?.toString();

    if (!cardNumber) return 'Card number is required to validate CVV';

    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      return 'AMEX cards must have a 4-digit CVV';
    }

    if (cardNumber.startsWith('4')) {
      return 'Visa cards must have a 3-digit CVV';
    }

    const first2 = parseInt(cardNumber.slice(0, 2), 10);
    const first4 = parseInt(cardNumber.slice(0, 4), 10);
    if (
      (first2 >= 51 && first2 <= 55) ||
      (first4 >= 2221 && first4 <= 2720)
    ) {
      return 'MasterCard cards must have a 3-digit CVV';
    }

    return 'CVV must be 3 or 4 digits depending on the card type';
  }
}
