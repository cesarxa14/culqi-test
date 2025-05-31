// infrastructure/mappers/token.mapper.ts
import { TokenEntity } from '../../domain/entities/token.entity';
import { EncryptionService } from '../api/encription.service';
import { TokenDocument } from '../data-source/mongo/schemas/token.schema';

export class TokenMapper {
  static toEntity(document: TokenDocument, encryptionService: EncryptionService): TokenEntity {
    console.log('mapper: ', document)
    let obj = {
      card_number: parseInt(encryptionService.decrypt(document.card_number)),
      cvv: -1,
      expiration_month: encryptionService.decrypt(document.expiration_month),
      expiration_year: encryptionService.decrypt(document.expiration_year),
      email: encryptionService.decrypt(document.email),
      token: document.token,
      createdAt: document.createdAt
    }; 
    console.log('obj: ', obj)
    return obj; 
  }
}
