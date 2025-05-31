import { IsNotEmpty, IsString, Length } from "class-validator";

export class GetTokenDataDto {

    @IsNotEmpty({ message: 'Token is required' })
    @IsString({ message: 'Token must be a string' })
    @Length(16, 16, { message: 'Token must have 16 characters' })
    readonly tokenData: string;
}