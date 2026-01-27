import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UserModule, ProductModule, SaleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
