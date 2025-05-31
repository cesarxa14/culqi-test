import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenDocument } from './schemas/token.schema';
import { GenerateTokenDto } from '../../../application/dto/generate-token.dto';
import { TokenRepository } from 'src/token/domain/repositories/token.repository';
import { CardDataEncrypt, TokenEntity } from 'src/token/domain/entities/token.entity';
import { TokenMapper } from '../../mappers/token.mapper';
import { GetTokenDataDto } from 'src/token/application/dto/get-data-card.dto';
import { DtoGetCardMapper } from '../../mappers/get-card-data.mapper';
import { GetDataCardResponseDto } from 'src/token/application/dto/responses/get-data-card.response.dto';
import { EncryptionService } from '../../api/encription.service';

@Injectable()
export class TokenMongoRepository implements TokenRepository{

  constructor(
    @InjectModel(TokenDocument.name) private tokenModel: Model<TokenDocument>,
    private readonly encryptionService: EncryptionService) {}


  async getCardData(tokenData: GetTokenDataDto): Promise<TokenEntity> {
    try{
      console.log('tokenData: ', tokenData)
      const cardData = await this.tokenModel.findOne({token: tokenData.tokenData}, {cvv: 0})
      console.log('card Dataaaa: ', cardData)
      // return DtoGetCardMapper.DtoGetCard(cardData);
      return TokenMapper.toEntity(cardData, this.encryptionService);
      // return cardData;
    }catch(err){
      console.log('TokenRepository.getCardData.error:', err)
    }
  }

  async generateToken(data: CardDataEncrypt): Promise<TokenEntity> {
    try{

      const created = new this.tokenModel({
        ...data
      });
      const saved = await created.save();

      return TokenMapper.toEntity(saved, this.encryptionService);
    }catch(err){
      console.log('TokenRepository.generateToken.error:', err)

    }
    
  }

  async tokenExists(token: string): Promise<boolean> {
    try {
      const found = await this.tokenModel.findOne({ token }).exec();
      return !!found;
    }catch(err){
      console.log('TokenRepository.tokenExists.error:', err)
    }
    
  }

}
