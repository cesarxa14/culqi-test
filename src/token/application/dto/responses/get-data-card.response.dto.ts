export class GetDataCardResponseDto{
    token: string;
    card_number: number;
    expiration_month: string;
    expiration_year: string;
    email: string;
    createdAt: Date;
}