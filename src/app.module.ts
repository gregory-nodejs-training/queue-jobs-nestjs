import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'fern.lesch@ethereal.email',
          pass: '6MxdHanRF6UMubm82e',
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [],
})
export class AppModule {}
