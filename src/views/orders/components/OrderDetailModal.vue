<template>
  <div v-if="isOpen && order" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
    
    <div class="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
      
      <!-- Modal Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div class="flex items-center gap-2.5">
          <FileText :size="20" class="text-blue-600" />
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-black text-slate-900">پیش‌فاکتور و سفارش</h3>
              <span class="font-mono text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                #{{ order.id }}
              </span>
            </div>
            <div class="text-[11px] text-slate-400 mt-0.5">
              ثبت‌شده در {{ formatDateFa(order.createdAt) }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            @click="handlePrint"
          >
            <Printer :size="14" />
            <span class="hidden sm:inline">چاپ / PDF</span>
          </button>

          <button
            type="button"
            class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
            @click="$emit('close')"
          >
            <X :size="16" />
          </button>
        </div>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-5 space-y-5">
        
        <!-- Customer & Delivery Box -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <User :size="15" class="text-slate-500" />
              <span>اطلاعات خریدار و تحویل بار</span>
            </span>

            <button
              type="button"
              class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              @click="handleCopyShippingLabel"
            >
              <Copy :size="13" />
              <span>کپی مشخصات روی بسته پستی</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-slate-400 text-[11px]">نام خریدار / فروشگاه:</span>
              <div class="font-black text-slate-800 mt-0.5">{{ order.customerName }}</div>
            </div>

            <div>
              <span class="text-slate-400 text-[11px]">شماره تماس:</span>
              <div class="mt-0.5 flex items-center gap-2">
                <a :href="`tel:${order.customerPhone}`" class="font-bold text-blue-600 hover:underline">
                  {{ order.customerPhone }}
                </a>
                <a 
                  :href="`https://wa.me/98${order.customerPhone.replace(/^0+/, '')}`" 
                  target="_blank"
                  class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold hover:bg-emerald-200"
                >
                  واتساپ
                </a>
              </div>
            </div>

            <div class="sm:col-span-2" v-if="order.customerAddress || order.customerCity">
              <span class="text-slate-400 text-[11px]">آدرس و باربری مقصد:</span>
              <div class="font-bold text-slate-700 mt-0.5 flex items-start gap-1">
                <MapPin :size="14" class="text-slate-400 shrink-0 mt-0.5" />
                <span>{{ order.customerCity ? order.customerCity + ' - ' : '' }}{{ order.customerAddress || 'ثبت نشده' }}</span>
              </div>
            </div>

            <div v-if="order.carrierPreference" class="sm:col-span-2">
              <span class="text-slate-400 text-[11px]">باربری انتخابی همکار:</span>
              <div class="font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg mt-0.5 inline-block">
                {{ order.carrierPreference }}
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Condition & Notes Box -->
        <div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-black text-amber-900 flex items-center gap-1.5">
              <Handshake :size="15" class="text-amber-700" />
              <span>شرایط تسویه‌حساب درخواستی:</span>
            </span>
            <span class="font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
              {{ getPaymentLabel(order.paymentMethod) }}
              <span v-if="order.chequeDueDate">({{ order.chequeDueDate }})</span>
            </span>
          </div>

          <div v-if="order.notes" class="pt-2 border-t border-amber-200/60">
            <span class="text-[11px] font-bold text-amber-800">توضیحات و هماهنگی خریدار:</span>
            <p class="text-slate-700 mt-1 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-amber-100">
              {{ order.notes }}
            </p>
          </div>
        </div>

        <!-- Products Table -->
        <div>
          <div class="text-xs font-black text-slate-800 mb-2 flex items-center gap-1.5">
            <Package :size="15" class="text-blue-600" />
            <span>اقلام فاکتور ({{ formatNumberFa(order.items.length) }} ردیف)</span>
          </div>

          <div class="border border-slate-200 rounded-2xl overflow-hidden">
            <table class="w-full text-right text-xs">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th class="py-2.5 px-3">کالا</th>
                  <th class="py-2.5 px-3 text-center">تعداد</th>
                  <th class="py-2.5 px-3 text-left">قیمت واحد</th>
                  <th class="py-2.5 px-3 text-left">مبلغ کل</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr v-for="item in order.items" :key="item.productId" class="hover:bg-slate-50/50">
                  <td class="py-2.5 px-3 flex items-center gap-2.5">
                    <img :src="item.imageUrl" :alt="item.title" class="w-9 h-9 rounded-lg object-cover bg-slate-100 shrink-0" />
                    <div>
                      <div class="font-bold text-slate-800">{{ item.title }}</div>
                      <div class="text-[10px] text-slate-400 font-mono" dir="ltr">{{ item.sku }}</div>
                    </div>
                  </td>
                  <td class="py-2.5 px-3 text-center font-bold text-blue-700">
                    {{ formatNumberFa(item.quantity) }}
                  </td>
                  <td class="py-2.5 px-3 text-left font-mono text-slate-600">
                    {{ formatNumberFa(item.price) }}
                  </td>
                  <td class="py-2.5 px-3 text-left font-black text-slate-900 font-mono">
                    {{ formatNumberFa(item.total) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Total Calculation -->
        <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 text-xs">
          <span class="font-bold text-slate-600">جمع کل سفارش:</span>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-black text-slate-900">{{ formatNumberFa(order.totalAmount) }}</span>
            <span class="text-xs font-bold text-slate-500">تومان</span>
          </div>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-500">تغییر وضعیت:</span>
          <select
            :value="order.status"
            class="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white cursor-pointer outline-hidden"
            @change="$emit('update-status', order.id, ($event.target as HTMLSelectElement).value as OrderStatus)"
          >
            <option value="pending">در انتظار بررسی شرایط</option>
            <option value="processing">در حال آماده‌سازی و فاکتور</option>
            <option value="shipped">تحویل باربری / ارسال شده</option>
            <option value="delivered">تحویل همکار شده</option>
            <option value="cancelled">لغو شده</option>
          </select>
        </div>

        <button
          type="button"
          class="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          بستن پنجره
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText, Printer, X, User, Copy, MapPin, Handshake, Package } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { Order, OrderStatus, PaymentMethod } from '../types';

const props = defineProps<{
  isOpen: boolean;
  order: Order | null;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'update-status', id: string, status: OrderStatus): void;
}>();

function formatDateFa(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoString;
  }
}

function getPaymentLabel(method: PaymentMethod): string {
  switch (method) {
    case 'credit': return 'حساب دفتری (نسیه)';
    case 'cheque': return 'چک صیادی مدت‌دار';
    case 'cash': return 'تسویه نقدی';
    default: return 'سایر';
  }
}

function handleCopyShippingLabel() {
  if (!props.order) return;
  const o = props.order;
  const text = `گیرنده: ${o.customerName}\nتلفن: ${o.customerPhone}\nشهر و آدرس: ${o.customerCity || ''} - ${o.customerAddress || ''}\nباربری مد نظر: ${o.carrierPreference || 'پیش‌فرض'}\nشماره سفارش: #${o.id}`;
  navigator.clipboard.writeText(text);
  alert('مشخصات کامل ارسال و نشانی در کلیپ‌بورد کپی شد (آماده چاپ یا چسباندن روی کارتن باربری).');
}

function handlePrint() {
  window.print();
}
</script>
