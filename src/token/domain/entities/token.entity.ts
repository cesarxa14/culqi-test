export interface TokenEntity{
    token: string;
    card_number: number;
    cvv: number;
    expiration_month: string;
    expiration_year: string;
    email: string;
    createdAt: Date;
}

export interface CardData {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
}

export interface CardDataEncrypt {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token: string;
  createdAt: Date;
}