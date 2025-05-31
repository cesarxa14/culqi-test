import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, Length, Matches, Max, Min, Validate } from "class-validator";
import { CvvValidator } from "src/validators/cvv.validator";
import { IsValidExpirationYearConstraint } from "src/validators/expiration_year.validator";
import { LuhnValidator } from "src/validators/luhn.validator";

export class GenerateTokenDto {

    @IsNotEmpty({ message: 'Card number is required' })
    @IsNumber({}, { message: 'Card number must be a number' })
    @Min(1e12, { message: 'Card number must be at least 13 digits' })
    @Max(1e16 - 1, { message: 'Card number must be at most 16 digits' })
    @Validate(LuhnValidator, { message: 'Card number is invalid (Luhn check failed)' })
    readonly card_number: number;

    @IsNotEmpty({ message: 'CVV is required' })
    @IsNumber({}, { message: 'CVV must be a number' })
    @Validate(CvvValidator)
    readonly cvv: number;


    @IsNotEmpty({ message: 'Expiration month is required' })
    @IsNumberString({}, { message: 'Expiration month must be numeric' })
    @Matches(/^(0?[1-9]|1[0-2])$/, {
        message: 'Expiration month must be a valid month between 1 and 12',
    })
    readonly expiration_month: string;

    @IsNotEmpty({ message: 'Expiration year is required' })
    @Matches(/^\d{4}$/, { message: 'Expiration year must be a 4-digit string' })
    @Validate(IsValidExpirationYearConstraint)
    readonly expiration_year: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Length(5, 100, {
    message: 'Email must be between 5 and 100 characters long',
    })
    @Matches(/^[^@]+@(gmail\.com|hotmail\.com|yahoo\.es)$/, {
    message: 'Email domain must be gmail.com, hotmail.com or yahoo.es',
    })
    readonly email: string;
}