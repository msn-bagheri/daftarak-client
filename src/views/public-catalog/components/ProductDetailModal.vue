<template>
  <div v-if="product" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
    
    <!-- Modal Card (Bottom sheet on mobile, rounded card on desktop) -->
    <div class="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
      
      <!-- Modal Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-400">شناسه کالا:</span>
          <span class="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{{ product.sku }}</span>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          @click="$emit('close')"
        >
          <X :size="16" />
        </button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="p-5 overflow-y-auto space-y-5">
        
        <!-- Image & Basic Info Row -->
        <div class="flex flex-col sm:flex-row gap-5">
          <div class="w-full sm:w-1/2 aspect-square rounded-2xl bg-slate-100 overflow-hidden shrink-0">
            <img
              :src="product.imageUrl"
              :alt="product.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="w-full sm:w-1/2 flex flex-col justify-between">
            <div>
              <div v-if="product.brand" class="text-xs font-bold text-blue-600 mb-1">
                {{ product.brand }}
              </div>
              <h2 class="text-base font-black text-slate-900 leading-snug">
                {{ product.title }}
              </h2>

              <!-- Status & MOQ -->
              <div class="flex items-center gap-2 flex-wrap my-3">
                <span 
                  v-if="product.inStock"
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  موجود در انبار
                </span>
                <span 
                  v-else
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200"
                >
                  ناموجود
                </span>

                <span v-if="product.packageCount" class="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  بسته {{ formatNumberFa(product.packageCount) }} عددی
                </span>
              </div>

              <!-- Price Box -->
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 mt-2">
                <div class="text-xs text-slate-400 mb-1">قیمت همکاری / عمده:</div>
                <div v-if="showPrices && product.inStock" class="flex items-baseline gap-1">
                  <span class="text-xl font-black text-slate-900">{{ formatNumberFa(product.price) }}</span>
                  <span class="text-xs text-slate-500 font-bold">تومان</span>
                </div>
                <div v-else-if="!product.inStock" class="text-sm font-bold text-slate-400">
                  ناموجود در انبار
                </div>
                <div v-else class="text-sm font-bold text-blue-600">
                  استعلام تلفنی قیمت
                </div>
              </div>
            </div>

            <!-- Quantity Selector & Add Button -->
            <div v-if="allowInquiryList && product.inStock" class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
              <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shrink-0">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  @click="orderQty = Math.max((product.minOrderQty || 1), orderQty - 1)"
                >
                  <Minus :size="14" />
                </button>
                <span class="w-10 text-center font-bold text-xs text-slate-800">{{ formatNumberFa(orderQty) }}</span>
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  @click="orderQty++"
                >
                  <Plus :size="14" />
                </button>
              </div>

              <button
                type="button"
                class="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                @click="handleAdd"
              >
                <Check :size="14" />
                <span>افزودن به لیست سفارش</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div v-if="product.description" class="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
          <h3 class="text-xs font-bold text-slate-700 mb-1.5">توضیحات و معرفی کالا:</h3>
          <p class="text-xs text-slate-600 leading-relaxed">{{ product.description }}</p>
        </div>

        <!-- Specs Table -->
        <div v-if="product.specs && Object.keys(product.specs).length > 0">
          <h3 class="text-xs font-bold text-slate-700 mb-2">مشخصات فنی:</h3>
          <div class="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
            <div 
              v-for="(val, key) in product.specs" 
              :key="key"
              class="flex items-center justify-between p-2.5 hover:bg-slate-50/70"
            >
              <span class="text-slate-400 font-medium">{{ key }}</span>
              <span class="font-bold text-slate-800">{{ val }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
        <a
          :href="`tel:${supplierPhone}`"
          class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all select-none"
        >
          <PhoneCall :size="15" />
          <span>تماس مستقیم با تأمین‌کننده ({{ supplierPhone }})</span>
        </a>

        <button
          type="button"
          class="py-2.5 px-5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 text-xs font-bold transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          بستن
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { X, Minus, Plus, Check, PhoneCall } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { CatalogProduct } from '../types';

const props = defineProps<{
  product: CatalogProduct | null;
  showPrices: boolean;
  allowInquiryList: boolean;
  supplierPhone: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'add-to-inquiry', product: CatalogProduct, qty: number): void;
}>();

const orderQty = ref<number>(props.product?.minOrderQty || 1);

function handleAdd() {
  if (!props.product) return;
  emit('add-to-inquiry', props.product, orderQty.value);
  emit('close');
}
</script>

