import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import helmet  from 'helmet'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(process.env.PORT ?? 3000);
    
}
bootstrap();
