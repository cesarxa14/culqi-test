import { generateRandomToken } from "src/utils/generate-random-token";
import { CardData, CardDataEncrypt, TokenEntity } from "../domain/entities/token.entity";
import { TokenRepository } from "../domain/repositories/token.repository";
import { GetTokenDataDto } from "./dto/get-data-card.dto";
import { GetDataCardResponseDto } from "./dto/responses/get-data-card.response.dto";
import { EncryptionService } from "../infraestructure/api/encription.service";


export class TokenUseCase{

    private readonly encryptionService = new EncryptionService();
    constructor(private readonly tokenRepository: TokenRepository){}

    async generateToken(data: CardData): Promise<string>{
        try{
            let token: string;
            do {
            token = generateRandomToken(16);
            } while (await this.tokenRepository.tokenExists(token));

            console.log('token: ', token)

            const { cvv, card_number, expiration_month, expiration_year, email } = data;

            const encryptedData: CardDataEncrypt = {
                card_number: this.encryptionService.encrypt(card_number.toString()),
                cvv: this.encryptionService.encrypt(cvv.toString()),
                expiration_month: this.encryptionService.encrypt(expiration_month),
                expiration_year: this.encryptionService.encrypt(expiration_year),
                email: this.encryptionService.encrypt(email),
                token,
                createdAt: new Date()
            };
            await this.tokenRepository.generateToken(encryptedData);

            console.log('token', token)
            return token;

        }catch(err) {
            console.log('TokenUseCase.generateToken.error: ', err)
            throw err;
        }
    }

    async getCardData(tokenData: GetTokenDataDto): Promise<GetDataCardResponseDto>{
        try{
            const cardData = await this.tokenRepository.getCardData(tokenData);

            console.log('use case card: ', cardData)
            if(!cardData){
                throw new Error('Card data not exist or has expired')
            }

            return cardData;
        }catch(error) {
            console.log('TokenUseCase.generateToken.error: ', error.message)
            throw new Error(error.message ?? 'Error al traer información de la tarjeta');
        }
    }
}