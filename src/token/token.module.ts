import { Module } from "@nestjs/common";
import { TokenController } from "./infraestructure/api/token.controller";
import { TokenService } from "./infraestructure/api/token.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenMongoRepository } from "./infraestructure/data-source/mongo/token.repository.mongo";
import { TokenDocument, TokenSchema } from "./infraestructure/data-source/mongo/schemas/token.schema";
import { ConfigService } from "@nestjs/config";
import { EncryptionService } from "./infraestructure/api/encription.service";


@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_MONGO_URL')
      })
    }),
    MongooseModule.forFeature([{ name: TokenDocument.name, schema: TokenSchema }])
  ],
  controllers: [
    TokenController
  ],
  providers: [
    TokenService,
    EncryptionService,
    TokenMongoRepository
  ]
})

export class TokenModule {}