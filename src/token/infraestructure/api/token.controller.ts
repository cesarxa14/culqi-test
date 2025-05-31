import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from "@nestjs/common";
import { TokenService } from "./token.service";
import { Response } from "express";
import { GenerateTokenDto } from "src/token/application/dto/generate-token.dto";
import { ApiKeyGuard } from "../guards/api-key.guard";
import { GetTokenDataDto } from "src/token/application/dto/get-data-card.dto";
import { createResponse } from "src/utils/create-response";

@Controller('tokens')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @UseGuards(ApiKeyGuard)
    @Post()
    async generateToken(@Body() cardData: GenerateTokenDto, @Res() res: Response){
        try{
            console.log('controllers')
            const newToken = await this.tokenService.generateToken(cardData);
            return res.status(HttpStatus.CREATED).json(createResponse('ok-single-item', {token: newToken}));

        }catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(createResponse('errores', error.message || 'Internal server error'))
        }
    }


    @UseGuards(ApiKeyGuard)
    @Get()
    async getCardData(@Query() tokenData: GetTokenDataDto, @Res() res: Response){
        try{
            console.log('getCardData', tokenData)
            const cardData = await this.tokenService.getCardData(tokenData)
            return res.status(HttpStatus.OK).json(createResponse('ok-single-item', cardData))
        }catch(error){
            console.log('error controller: ', error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(createResponse('errores', error.message || 'Internal server error'))
        }
    }



}