export type PaymentMethod = 'cash' | 'cheque' | 'credit';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  sku: string;
  imageUrl: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string; // e.g. "DFT-84920"
  createdAt: string; // ISO date
  customerName: string;
  customerPhone: string;
  customerCity?: string;
  customerAddress?: string;
  carrierPreference?: string;
  paymentMethod: PaymentMethod;
  chequeDueDate?: string; // e.g. "۴۵ روزه"
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingCount: number;
  processingCount: number;
  shippedCount: number;
  totalVolume: number;
}

