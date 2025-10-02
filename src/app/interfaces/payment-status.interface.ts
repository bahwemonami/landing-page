export interface PaymentStatus { paymentId: string; status: 'pending' | 'confirmed' | 'failed'; txHash?: string; }
