import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';
import { SendMailConstants } from '../shared/send.mail.constants';

@Processor(SendMailConstants.SEND_MAIL_QUEUE)
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(SendMailConstants.SEND_MAIL_JOB)
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Gregory Feijon <gregory.feijon@gregory.feijon>',
      subject: 'Seja bem vindo(a)!',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On completed ${job.name}`);
  }

  @OnQueueProgress()
  onProgress(job: Job) {
    console.log(`On progress ${job.name}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`On active ${job.name}`);
  }
}

export { SendMailConsumer };
