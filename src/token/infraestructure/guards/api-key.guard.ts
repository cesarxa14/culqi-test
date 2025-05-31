import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKey = process.env.X_API_KEY;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new BadRequestException('API key is missing');
    }

     const apiKeyFormat = /^pk_test_[a-zA-Z0-9-_]+$/;
    if (!apiKeyFormat.test(apiKey)) {
      throw new BadRequestException('API key format is invalid');
    }

    if (apiKey !== this.validApiKey) {
      throw new BadRequestException('Invalid API key');
    }

    // Aquí podrías agregar formato u otras validaciones

    return true;
  }
}
