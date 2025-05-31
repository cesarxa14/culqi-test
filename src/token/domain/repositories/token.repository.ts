import { GetTokenDataDto } from "src/token/application/dto/get-data-card.dto";
import { CardData, TokenEntity } from "../entities/token.entity";
import { GetDataCardResponseDto } from "src/token/application/dto/responses/get-data-card.response.dto";

export interface TokenRepository {
    generateToken(data: CardData & { token: string; createdAt: Date }): Promise<TokenEntity>;
    tokenExists(token: string): Promise<boolean>;
    getCardData(tokenData: GetTokenDataDto): Promise<GetDataCardResponseDto>
}