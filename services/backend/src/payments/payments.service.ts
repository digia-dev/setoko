import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  createMidtransTransaction(orderId: string, amount: number) {
    return {
      token: 'midtrans-demo-token',
      redirect_url: `https://app.midtrans.com/snap/v1/transactions/${orderId}`,
      amount,
      order_id: orderId,
    };
  }

  handleWebhook(payload: any) {
    return {
      status: 'success',
      orderId: payload.order_id,
    };
  }
}
