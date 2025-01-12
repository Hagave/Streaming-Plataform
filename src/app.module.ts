import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { VideosModule } from './videos/videos.module';
import { QueuesModule } from './queues/queues.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    LoginModule,
    VideosModule,
    QueuesModule,
    S3Module,
  ],
  controllers: [],
  providers: [PrismaService], //sem token
  // providers: [PrismaService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
