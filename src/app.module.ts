import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UserModule, PrismaModule, LoginModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
