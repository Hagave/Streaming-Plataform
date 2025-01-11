import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [PrismaModule, AuthModule],
})
export class LoginModule {}
