import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('midtrans/create')
  createTransaction(@Body() body: any) {
    return this.paymentsService.createMidtransTransaction(body.order_id, body.amount);
  }

  @Post('midtrans/webhook')
  webhook(@Body() payload: any) {
    return this.paymentsService.handleWebhook(payload);
  }
}
