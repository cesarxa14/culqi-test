import { GetDataCardResponseDto } from "src/token/application/dto/responses/get-data-card.response.dto";
import { TokenDocument } from "../data-source/mongo/schemas/token.schema";


export class DtoGetCardMapper {
  static DtoGetCard(document: TokenDocument): GetDataCardResponseDto {
    return {
      card_number: parseInt(document.card_number),
      expiration_month: document.expiration_month,
      expiration_year: document.expiration_year,
      email: document.email,
      token: document.token,
      createdAt: document.createdAt
    };
  }
}