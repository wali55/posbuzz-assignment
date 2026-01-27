import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;
  
  // IMPORTANT: Bind to '0.0.0.0' so Railway's proxy can find the process
  await app.listen(port, '0.0.0.0'); 
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
