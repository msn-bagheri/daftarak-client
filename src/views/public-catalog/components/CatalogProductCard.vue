<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
    
    <!-- Top Image & Badges -->
    <div>
      <div 
        class="relative w-full aspect-square rounded-xl bg-slate-100 overflow-hidden mb-3 cursor-pointer select-none"
        @click="$emit('open-detail', product)"
      >
        <img
          :src="product.imageUrl"
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <!-- Stock Status Badge -->
        <div class="absolute top-2 right-2">
          <span 
            v-if="product.inStock"
            class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-xs shadow-xs"
          >
            موجود
          </span>
          <span 
            v-else
            class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700/90 text-white backdrop-blur-xs shadow-xs"
          >
            ناموجود
          </span>
        </div>

        <!-- Brand Badge -->
        <div v-if="product.brand" class="absolute bottom-2 right-2">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs shadow-xs">
            {{ product.brand }}
          </span>
        </div>
      </div>

      <!-- SKU & Title -->
      <div class="mb-2">
        <div class="text-[10px] text-slate-400 font-mono" dir="ltr">
          {{ product.sku }}
        </div>
        <h3 
          class="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 mt-1 cursor-pointer hover:text-blue-600 transition-colors"
          @click="$emit('open-detail', product)"
        >
          {{ product.title }}
        </h3>
      </div>

      <!-- Packaging & Minimum Order (MOQ) Info -->
      <div class="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 mb-3">
        <span v-if="product.packageCount" class="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
          <Package :size="12" class="text-slate-400" />
          بسته {{ formatNumberFa(product.packageCount) }} عددی
        </span>
        <span v-if="product.minOrderQty && product.minOrderQty > 1" class="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
          حداقل سفارش: {{ formatNumberFa(product.minOrderQty) }} عدد
        </span>
      </div>
    </div>

    <!-- Bottom: Price & Actions -->
    <div class="pt-3 border-t border-slate-100">
      
      <!-- Price Display -->
      <div class="flex items-baseline justify-between mb-3">
        <span class="text-xs text-slate-400 font-medium">قیمت همکاری:</span>
        <div v-if="showPrices && product.inStock">
          <span class="text-base sm:text-lg font-black text-slate-900">
            {{ formatNumberFa(product.price) }}
          </span>
          <span class="text-[11px] text-slate-500 font-bold mr-1">تومان</span>
        </div>
        <div v-else-if="!product.inStock" class="text-xs font-bold text-slate-400">
          ناموجود در انبار
        </div>
        <div v-else class="text-xs font-bold text-blue-600">
          تماس جهت استعلام
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2">
        
        <!-- Quick Call for this Item -->
        <a
          :href="`tel:${supplierPhone}`"
          class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-all select-none"
          title="تماس مستقیم جهت ثبت سفارش این کالا"
        >
          <Phone :size="13" class="text-emerald-600" />
          <span>تماس</span>
        </a>

        <!-- Add to Order List or Detail Button -->
        <button
          v-if="allowInquiryList && product.inStock"
          type="button"
          class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer select-none"
          @click="$emit('add-to-inquiry', product)"
        >
          <Plus :size="14" />
          <span>سفارش</span>
        </button>

        <button
          v-else
          type="button"
          class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer select-none"
          @click="$emit('open-detail', product)"
        >
          <Eye :size="13" />
          <span>مشاهده</span>
        </button>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Package, Phone, Plus, Eye } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { CatalogProduct } from '../types';

defineProps<{
  product: CatalogProduct;
  showPrices: boolean;
  allowInquiryList: boolean;
  supplierPhone: string;
}>();

defineEmits<{
  (e: 'open-detail', product: CatalogProduct): void;
  (e: 'add-to-inquiry', product: CatalogProduct): void;
}>();
</script>

