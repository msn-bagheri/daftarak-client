import { ref, computed } from 'vue';
import type { Order, OrderStatus, OrderStats, PaymentMethod } from '../types';

export const ORDERS_STORAGE_KEY = 'daftarak_orders';

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'DFT-98421',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    customerName: 'فروشگاه الکترو پارس (حسین رضایی)',
    customerPhone: '09123456789',
    customerCity: 'اصفهان',
    customerAddress: 'میدان امام علی، ابتدای خیابان هاتف، پلاک ۲۴',
    carrierPreference: 'باربری وطن (دفتر شاپور جدید)',
    paymentMethod: 'credit',
    status: 'pending',
    items: [
      {
        productId: 'p-1',
        title: 'کابل شارژ سریع Type-C به Type-C اسکار ۱۰۰ وات ۶۰ فوت',
        sku: 'OSC-TC100-GRY',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
        price: 185000,
        quantity: 50,
        total: 9250000,
      },
      {
        productId: 'p-2',
        title: 'شارژر دیواری دو پورت گان ۶۵ وات سامسونگ مدل Super Fast',
        sku: 'SAM-GAN65-WHT',
        imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60',
        price: 680000,
        quantity: 15,
        total: 10200000,
      }
    ],
    totalAmount: 19450000,
    notes: 'همکار قدیمی هستم، بیزحمت طبق روال گذشته ثبت در حساب دفتری بفرمایید. باربری حتماً تحویل شاپور شود.',
  },
  {
    id: 'DFT-98394',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    customerName: 'موبایل پرشین (کامران ابراهیمی)',
    customerPhone: '09351122334',
    customerCity: 'مشهد',
    customerAddress: 'احمدآباد، مجتمع تجاری ورسیج، همکف واحد ۱۲',
    carrierPreference: 'تیپاکس - شعبه احمدآباد',
    paymentMethod: 'cheque',
    chequeDueDate: 'چک ۴۵ روزه صیادی',
    status: 'processing',
    items: [
      {
        productId: 'p-3',
        title: 'هندزفری بلوتوثی هایلو مدل W1 کیفیت صدای های‌فای',
        sku: 'HYL-W1-BLU',
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
        price: 940000,
        quantity: 20,
        total: 18800000,
      },
      {
        productId: 'p-6',
        title: 'پک ۵۰ عددی گلس سرامیکی آنتی‌استاتیک مات آیفون ۱۳ و ۱۴',
        sku: 'GLS-CER-IP13',
        imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format&fit=crop&q=60',
        price: 490000,
        quantity: 5,
        total: 2450000,
      }
    ],
    totalAmount: 21250000,
    notes: 'مشخصات چک صیاد بنفش ثبت شد در سامانه پیچک. لطفاً بعد از استعلام سفید تایید بفرمایید.',
  },
  {
    id: 'DFT-97812',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // yesterday
    customerName: 'پخش لوازم دیجیتال نوین (سعید کاظمی)',
    customerPhone: '09139876543',
    customerCity: 'شیراز',
    customerAddress: 'بلوار زند، روبروی بیمارستان شهید فقیهی، پاساژ ولیعصر',
    carrierPreference: 'پیشتاز یا باربری اتوبوسرانی کاراندیش',
    paymentMethod: 'cash',
    status: 'shipped',
    items: [
      {
        productId: 'p-5',
        title: 'هولدر و پایه نگهدارنده موبایل دریچه کولری باسئوس',
        sku: 'BAS-HLD-AIR',
        imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&auto=format&fit=crop&q=60',
        price: 320000,
        quantity: 40,
        total: 12800000,
      }
    ],
    totalAmount: 12800000,
    notes: 'مبلغ نقداً واریز شد به حساب بانک ملت. شماره فیش تلگرام شد.',
  }
];

export function useOrders() {
  const orders = ref<Order[]>(loadStoredOrders());
  const selectedStatus = ref<string>('all');
  const searchQuery = ref<string>('');
  const selectedOrder = ref<Order | null>(null);
  const isDetailOpen = ref<boolean>(false);

  function loadStoredOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Seed sample orders if none exist
    saveOrdersToStorage(SAMPLE_ORDERS);
    return SAMPLE_ORDERS;
  }

  function saveOrdersToStorage(list: Order[]) {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  const filteredOrders = computed(() => {
    return orders.value.filter(o => {
      if (selectedStatus.value !== 'all' && o.status !== selectedStatus.value) {
        return false;
      }
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.trim().toLowerCase();
        const matchName = o.customerName.toLowerCase().includes(q);
        const matchPhone = o.customerPhone.includes(q);
        const matchId = o.id.toLowerCase().includes(q);
        const matchCity = (o.customerCity || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchId && !matchCity) return false;
      }
      return true;
    });
  });

  const stats = computed<OrderStats>(() => {
    const list = orders.value;
    return {
      totalOrders: list.length,
      pendingCount: list.filter(o => o.status === 'pending').length,
      processingCount: list.filter(o => o.status === 'processing').length,
      shippedCount: list.filter(o => o.status === 'shipped').length,
      totalVolume: list.reduce((sum, o) => sum + o.totalAmount, 0),
    };
  });

  function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    const order = orders.value.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      saveOrdersToStorage(orders.value);
    }
  }

  function addOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const newId = 'DFT-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    orders.value.unshift(newOrder);
    saveOrdersToStorage(orders.value);
    return newOrder;
  }

  function deleteOrder(orderId: string) {
    orders.value = orders.value.filter(o => o.id !== orderId);
    saveOrdersToStorage(orders.value);
    if (selectedOrder.value?.id === orderId) {
      closeDetail();
    }
  }

  function openDetail(order: Order) {
    selectedOrder.value = order;
    isDetailOpen.value = true;
  }

  function closeDetail() {
    isDetailOpen.value = false;
    selectedOrder.value = null;
  }

  function getPaymentMethodLabel(method: PaymentMethod): string {
    switch (method) {
      case 'credit': return 'حساب دفتری (نسیه)';
      case 'cheque': return 'چک صیادی مدت‌دار';
      case 'cash': return 'تسویه نقدی';
      default: return 'سایر';
    }
  }

  function getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case 'pending': return 'در انتظار بررسی';
      case 'processing': return 'در حال آماده‌سازی';
      case 'shipped': return 'ارسال شده';
      case 'delivered': return 'تحویل شده';
      case 'cancelled': return 'لغو شده';
      default: return status;
    }
  }

  return {
    orders,
    selectedStatus,
    searchQuery,
    filteredOrders,
    stats,
    selectedOrder,
    isDetailOpen,
    updateOrderStatus,
    addOrder,
    deleteOrder,
    openDetail,
    closeDetail,
    getPaymentMethodLabel,
    getStatusLabel,
  };
}

