import { TokenUseCase } from './token.use.cases';
import { TokenRepository } from '../domain/repositories/token.repository';
import { CardData, TokenEntity } from '../domain/entities/token.entity';
import * as tokenUtils from '../../utils/generate-random-token';
import { GetDataCardResponseDto } from './dto/responses/get-data-card.response.dto';

jest.spyOn(tokenUtils, 'generateRandomToken').mockReturnValue('fixedToken123456');

describe('TokenUseCase', () => {
  let useCase: TokenUseCase;
  let mockRepo: jest.Mocked<TokenRepository>;

  beforeEach(() => {
    mockRepo = {
      tokenExists: jest.fn(),
      generateToken: jest.fn(),
      getCardData: jest.fn(),
    };
    useCase = new TokenUseCase(mockRepo);
  });

  describe('generateToken', () => {
    it('should generate a unique token and store it', async () => {
      const cardData: CardData = {
        card_number: '1234567890123456',
        cvv: '123',
        expiration_month: '12',
        expiration_year: '2027',
        email: 'test@gmail.com',
      };

      mockRepo.tokenExists.mockResolvedValue(false);
      mockRepo.generateToken.mockResolvedValue(undefined);

      const token = await useCase.generateToken(cardData);

      expect(token).toBe('fixedToken123456');
      expect(mockRepo.tokenExists).toHaveBeenCalledWith('fixedToken123456');
      expect(mockRepo.generateToken).toHaveBeenCalledWith(expect.objectContaining({
        card_number: expect.any(String),
        cvv: expect.any(String),
        email: expect.any(String),
        expiration_month: expect.any(String),
        expiration_year: expect.any(String),
        token: 'fixedToken123456',
        createdAt: expect.any(Date)
      }));
    });

    it('should retry if token already exists', async () => {
      let callCount = 0;
      mockRepo.tokenExists.mockImplementation(() => {
        callCount++;
        return Promise.resolve(callCount < 2);
      });
      mockRepo.generateToken.mockResolvedValue(undefined);

      const token = await useCase.generateToken({
        card_number: '1234567890123456',
        cvv: '123',
        expiration_month: '12',
        expiration_year: '2027',
        email: 'test@gmail.com',
      });

      expect(mockRepo.tokenExists).toHaveBeenCalledTimes(2);
      expect(token).toBe('fixedToken123456');
    });
  });

  describe('getCardData', () => {
    it('should return card data from repository', async () => {
      const tokenData = { tokenData: 'fixedToken12345678' };
      const response: GetDataCardResponseDto = {
        token: 'fixedToken12345678',
        card_number: 1234567890123456,
        expiration_month: '12',
        expiration_year: '2027',
        email: 'test@gmail.com',
        createdAt: new Date(),
      };

      mockRepo.getCardData.mockResolvedValue(response);

      const result = await useCase.getCardData(tokenData);
      expect(response).not.toHaveProperty('cvv');
      expect(result).toEqual(response);
      expect(mockRepo.getCardData).toHaveBeenCalledWith(tokenData);
    });
  });
});
