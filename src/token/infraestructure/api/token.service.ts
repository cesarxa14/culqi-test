import { Injectable } from "@nestjs/common";
import { TokenUseCase } from "src/token/application/token.use.cases";
import { TokenMongoRepository } from "../data-source/mongo/token.repository.mongo";
import { GenerateTokenDto } from "src/token/application/dto/generate-token.dto";
import { GetTokenDataDto } from "src/token/application/dto/get-data-card.dto";
import { GetDataCardResponseDto } from "src/token/application/dto/responses/get-data-card.response.dto";
import { DtoGenerateTokenMapper } from '../mappers/generate-token.mapper';


@Injectable()
export class TokenService {
    private tokenUseCase: TokenUseCase;

    constructor(tokenMongoRepository: TokenMongoRepository) {
        this.tokenUseCase = new TokenUseCase(tokenMongoRepository);
    }

    async generateToken(data: GenerateTokenDto): Promise<string>{
        const mapper = DtoGenerateTokenMapper.DtoGenerateToken(data);
        const token = await this.tokenUseCase.generateToken(mapper)
        return token;
    }

    async getCardData(data: GetTokenDataDto): Promise<GetDataCardResponseDto>{
            const token = await this.tokenUseCase.getCardData(data)
            return token;
    }
}