<template>
  <div class="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
    <div class="text-xs font-bold text-slate-500 ml-1">
      نتیجه بررسی فایل:
    </div>

    <!-- Chip 1: Total products found -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
      <Package :size="14" />
      <span>{{ formatNumberFa(totalProducts) }} کالا پیدا شد</span>
    </div>

    <!-- Chip 2: Price changes -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
      <TrendingUp :size="14" />
      <span>{{ formatNumberFa(priceChanges) }} تغییر قیمت</span>
    </div>

    <!-- Chip 3: Out of stock -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
      <AlertCircle :size="14" />
      <span>{{ formatNumberFa(outOfStock) }} کالای ناموجود</span>
    </div>

    <!-- Chip 4: New products to create -->
    <div v-if="createdProducts" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
      <PlusCircle :size="14" />
      <span>{{ formatNumberFa(createdProducts) }} کالای جدید</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, TrendingUp, AlertCircle, PlusCircle } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';

defineProps<{
  totalProducts: number;
  priceChanges: number;
  outOfStock: number;
  createdProducts?: number;
}>();
</script>

