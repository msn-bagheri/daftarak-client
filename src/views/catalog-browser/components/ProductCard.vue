<template>
  <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
    <!-- Left Section: 48x48 Thumbnail + Title + Supplier SKU -->
    <div class="flex items-center gap-3.5 w-full sm:w-5/12">
      <img 
        :src="product.imageUrl" 
        :alt="product.name" 
        class="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100 bg-slate-50"
        loading="lazy"
      />
      <div class="min-w-0">
        <h3 class="text-sm font-bold text-slate-900 leading-snug truncate" :title="product.name">
          {{ product.name }}
        </h3>
        <div class="text-[11px] text-slate-400 font-mono mt-0.5">
          {{ product.sku }}
        </div>
      </div>
    </div>

    <!-- Center Section: Buy Price & Sale Price (with profit) -->
    <div class="flex items-center justify-between sm:justify-start gap-6 w-full sm:w-4/12 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
      <div>
        <div class="text-[11px] text-slate-400 font-medium">قیمت خرید عمده:</div>
        <div class="text-xs font-bold text-slate-700 font-mono">
          {{ formatNumberFa(product.costPrice) }} تومان
        </div>
      </div>

      <div>
        <div class="text-[11px] text-slate-400 font-medium">قیمت فروش در سایت:</div>
        <div class="text-sm font-black text-blue-700 font-mono">
          {{ formatNumberFa(product.salePrice) }} تومان
        </div>
        <div class="text-[10px] text-emerald-600 font-bold">
          (سود: {{ formatNumberFa(product.profit) }} تومان)
        </div>
      </div>
    </div>

    <!-- Right Section: Stock Badge & Toggle Switch -->
    <div class="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-3/12 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
      <!-- Stock Badge -->
      <div>
        <span 
          v-if="product.isAvailable" 
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
        >
          موجود: {{ toPersianDigits(product.stockQuantity) }} عدد
        </span>
        <span 
          v-else 
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200"
        >
          ناموجود
        </span>
      </div>

      <!-- Toggle Switch: فروش فعال روی سایت -->
      <label class="inline-flex items-center gap-2 cursor-pointer select-none" title="فروش فعال روی سایت">
        <span class="text-xs font-medium text-slate-600 hidden lg:inline">
          {{ product.isActiveOnSite ? 'فروش فعال' : 'غیرفعال' }}
        </span>
        <div 
          class="w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative"
          :class="product.isActiveOnSite ? 'bg-blue-600' : 'bg-slate-200'"
          @click.prevent="$emit('toggle', product.id)"
        >
          <div 
            class="w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out"
            :class="product.isActiveOnSite ? '-translate-x-4' : 'translate-x-0'"
          />
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatNumberFa, toPersianDigits } from '../../../utils/formatters';
import type { ProductItem } from '../types';

defineProps<{
  product: ProductItem;
}>();

defineEmits<{
  (e: 'toggle', id: string): void;
}>();
</script>
