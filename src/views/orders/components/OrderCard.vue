<template>
  <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all">
    
    <!-- Top Row: Order ID, Date, and Payment Condition Badge -->
    <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <span class="text-xs font-black text-slate-900 font-mono tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">
          #{{ order.id }}
        </span>
        <span class="text-[11px] text-slate-400">
          {{ formatDateFa(order.createdAt) }}
        </span>
      </div>

      <!-- Payment Method Badge -->
      <div 
        class="text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
        :class="getPaymentBadgeClass(order.paymentMethod)"
      >
        <component :is="getPaymentIcon(order.paymentMethod)" :size="13" />
        <span>{{ getPaymentLabel(order.paymentMethod) }}</span>
        <span v-if="order.chequeDueDate" class="text-[10px] opacity-80 font-normal">({{ order.chequeDueDate }})</span>
      </div>
    </div>

    <!-- Main Content: Customer & Shipping Info -->
    <div class="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h4 class="text-sm font-black text-slate-800">{{ order.customerName }}</h4>
        <div class="flex items-center gap-3 text-xs text-slate-500 mt-1">
          <a 
            :href="`tel:${order.customerPhone}`"
            class="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            <Phone :size="12" />
            <span>{{ order.customerPhone }}</span>
          </a>
          <span v-if="order.customerCity" class="flex items-center gap-1 text-slate-400">
            <MapPin :size="12" />
            <span>{{ order.customerCity }}</span>
          </span>
          <span v-if="order.carrierPreference" class="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-bold">
            {{ order.carrierPreference }}
          </span>
        </div>
      </div>

      <!-- Price & Item count -->
      <div class="text-left sm:text-right shrink-0">
        <div class="text-[11px] text-slate-400">مبلغ کل سفارش ({{ formatNumberFa(order.items.length) }} قلم)</div>
        <div class="text-base font-black text-slate-900 mt-0.5">
          {{ formatNumberFa(order.totalAmount) }} <span class="text-xs font-bold text-slate-500">تومان</span>
        </div>
      </div>
    </div>

    <!-- Items Preview (Thumbnail list) -->
    <div class="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 overflow-x-auto">
      <div 
        v-for="item in order.items.slice(0, 4)" 
        :key="item.productId"
        class="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-lg p-1.5 shrink-0 text-xs text-slate-700"
      >
        <img :src="item.imageUrl" :alt="item.title" class="w-7 h-7 rounded-md object-cover bg-slate-100" />
        <span class="max-w-[120px] truncate text-[11px] font-bold">{{ item.title }}</span>
        <span class="text-[10px] font-mono text-blue-600 font-bold">×{{ formatNumberFa(item.quantity) }}</span>
      </div>
      <span v-if="order.items.length > 4" class="text-[11px] text-slate-400 font-bold shrink-0">
        +{{ formatNumberFa(order.items.length - 4) }} قلم دیگر
      </span>
    </div>

    <!-- Actions & Status Changer -->
    <div class="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
      
      <!-- Status Dropdown Selector -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-slate-500">وضعیت سفارش:</span>
        <select
          :value="order.status"
          class="text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer outline-hidden"
          :class="getStatusSelectClass(order.status)"
          @change="$emit('update-status', order.id, ($event.target as HTMLSelectElement).value as OrderStatus)"
        >
          <option value="pending">در انتظار بررسی شرایط</option>
          <option value="processing">در حال آماده‌سازی و فاکتور</option>
          <option value="shipped">تحویل باربری / ارسال شده</option>
          <option value="delivered">تحویل همکار شده</option>
          <option value="cancelled">لغو شده</option>
        </select>
      </div>

      <!-- Action Button -->
      <button
        type="button"
        class="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        @click="$emit('open-detail', order)"
      >
        <Eye :size="14" />
        <span>مشاهده اقلام و چاپ پیش‌فاکتور</span>
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Phone, MapPin, Eye, CreditCard, FileCheck, Handshake } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { Order, OrderStatus, PaymentMethod } from '../types';

defineProps<{
  order: Order;
}>();

defineEmits<{
  (e: 'update-status', id: string, status: OrderStatus): void;
  (e: 'open-detail', order: Order): void;
}>();

function formatDateFa(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('fa-IR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoString;
  }
}

function getPaymentBadgeClass(method: PaymentMethod): string {
  switch (method) {
    case 'credit': return 'bg-purple-50 text-purple-700 border border-purple-200';
    case 'cheque': return 'bg-amber-50 text-amber-700 border border-amber-200';
    case 'cash': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    default: return 'bg-slate-100 text-slate-700';
  }
}

function getPaymentIcon(method: PaymentMethod) {
  switch (method) {
    case 'credit': return Handshake;
    case 'cheque': return FileCheck;
    case 'cash': return CreditCard;
    default: return CreditCard;
  }
}

function getPaymentLabel(method: PaymentMethod): string {
  switch (method) {
    case 'credit': return 'حساب دفتری (نسیه)';
    case 'cheque': return 'چک صیادی';
    case 'cash': return 'تسویه نقدی';
    default: return 'سایر';
  }
}

function getStatusSelectClass(status: OrderStatus): string {
  switch (status) {
    case 'pending': return 'bg-amber-50 border-amber-300 text-amber-800';
    case 'processing': return 'bg-indigo-50 border-indigo-300 text-indigo-800';
    case 'shipped': return 'bg-blue-50 border-blue-300 text-blue-800';
    case 'delivered': return 'bg-emerald-50 border-emerald-300 text-emerald-800';
    case 'cancelled': return 'bg-rose-50 border-rose-300 text-rose-800';
    default: return 'bg-white border-slate-300 text-slate-800';
  }
}
</script>
