import { GenerateTokenDto } from "src/token/application/dto/generate-token.dto";
import { CardData } from "src/token/domain/entities/token.entity";


export class DtoGenerateTokenMapper {
  static DtoGenerateToken(dto: GenerateTokenDto): CardData {
    return {
      card_number: dto.card_number.toString(),
      cvv: dto.cvv.toString(),
      expiration_month: dto.expiration_month,
      expiration_year: dto.expiration_year,
      email: dto.email
    };
  }
}