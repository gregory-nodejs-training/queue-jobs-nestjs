import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';
import { SendMailConstants } from '../shared/send.mail.constants';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue(SendMailConstants.SEND_MAIL_QUEUE) private queue: Queue) {}

  async sendMail(createUserDTO: CreateUserDTO) {
    await this.queue.add(SendMailConstants.SEND_MAIL_JOB, createUserDTO, {
      attempts: 3,
    });
  }
}

export { SendMailProducerService };
