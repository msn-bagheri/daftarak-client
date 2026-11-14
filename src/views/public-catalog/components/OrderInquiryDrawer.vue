<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
    
    <!-- Drawer Container -->
    <div class="w-full sm:max-w-md bg-white h-[85vh] sm:h-[90vh] rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
      
      <!-- Drawer Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <ClipboardList :size="18" class="text-blue-600" />
          <h2 class="text-sm font-black text-slate-900">لیست استعلام و سفارش همکار</h2>
          <span class="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
            {{ formatNumberFa(totalCount) }} قلم
          </span>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          @click="$emit('close')"
        >
          <X :size="16" />
        </button>
      </div>

      <!-- Items List (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div v-if="items.length === 0" class="py-16 text-center text-slate-400">
          <PackageOpen :size="48" class="mx-auto mb-3 opacity-30" />
          <p class="text-xs font-bold text-slate-600">هنوز کالایی به لیست استعلام اضافه نکرده‌اید</p>
          <p class="text-[11px] text-slate-400 mt-1">با کلیک روی دکمه سفارش هر کالا، اقلام به این لیست اضافه می‌شوند.</p>
        </div>

        <div
          v-for="item in items"
          :key="item.product.id"
          class="p-3 rounded-2xl border border-slate-200/90 bg-white flex items-center gap-3 shadow-2xs"
        >
          <img
            :src="item.product.imageUrl"
            :alt="item.product.title"
            class="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
          />

          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-800 truncate">{{ item.product.title }}</h4>
            <div class="text-[10px] text-slate-400 font-mono" dir="ltr">{{ item.product.sku }}</div>
            
            <div v-if="showPrices" class="text-xs font-black text-blue-700 mt-1">
              {{ formatNumberFa(item.product.price * item.quantity) }} تومان
            </div>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
            <button
              type="button"
              class="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              @click="$emit('update-qty', item.product.id, -1)"
            >
              <Minus :size="12" />
            </button>
            <span class="w-8 text-center text-xs font-bold text-slate-800">{{ formatNumberFa(item.quantity) }}</span>
            <button
              type="button"
              class="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              @click="$emit('update-qty', item.product.id, 1)"
            >
              <Plus :size="12" />
            </button>
          </div>

          <!-- Remove Item Button -->
          <button
            type="button"
            class="p-1.5 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
            title="حذف از لیست"
            @click="$emit('remove-item', item.product.id)"
          >
            <Trash2 :size="14" />
          </button>
        </div>
      </div>

      <!-- Drawer Footer with Inquiry / Call Actions -->
      <div v-if="items.length > 0" class="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
        
        <!-- Total Price Summary (if showPrices is true) -->
        <div v-if="showPrices" class="flex items-baseline justify-between">
          <span class="text-xs font-bold text-slate-500">جمع کل برآورد اولیه:</span>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-black text-slate-900">{{ formatNumberFa(totalPrice) }}</span>
            <span class="text-xs font-bold text-slate-500">تومان</span>
          </div>
        </div>

        <!-- Action 1: Direct Phone Call with Order -->
        <a
          :href="`tel:${supplierPhone}`"
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all select-none"
        >
          <PhoneCall :size="16" />
          <span>تماس و خواندن اقلام سفارش ({{ supplierPhone }})</span>
        </a>

        <!-- Action 2: Copy Text / Send via WhatsApp -->
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            @click="handleCopyText"
          >
            <Copy :size="14" />
            <span>کپی متن سفارش</span>
          </button>

          <a
            v-if="whatsappNumber"
            :href="`https://wa.me/98${formatWhatsappNumber(whatsappNumber)}?text=${encodeURIComponent(generateInquiryText())}`"
            target="_blank"
            rel="noopener noreferrer"
            class="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors select-none"
          >
            <MessageCircle :size="14" class="text-emerald-600" />
            <span>ارسال به واتساپ</span>
          </a>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ClipboardList, X, PackageOpen, Minus, Plus, Trash2, PhoneCall, Copy, MessageCircle } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { OrderInquiryItem } from '../types';

const props = defineProps<{
  isOpen: boolean;
  items: OrderInquiryItem[];
  totalCount: number;
  totalPrice: number;
  showPrices: boolean;
  supplierPhone: string;
  whatsappNumber?: string;
  generateInquiryText: () => string;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'update-qty', productId: string, delta: number): void;
  (e: 'remove-item', productId: string): void;
  (e: 'clear'): void;
}>();

function formatWhatsappNumber(num: string): string {
  return num.replace(/^0+/, '');
}

function handleCopyText() {
  const text = props.generateInquiryText();
  navigator.clipboard.writeText(text);
  alert('متن کامل اقلام سفارش در کلیپ‌بورد کپی شد؛ اکنون می‌توانید آن را در چت یا پیامک ارسال کنید.');
}
</script>

