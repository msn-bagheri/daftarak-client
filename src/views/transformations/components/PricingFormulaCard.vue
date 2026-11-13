<template>
  <div class="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Calculator :size="18" />
        </div>
        <h2 class="text-base font-bold text-slate-900">
          محاسبه سود
        </h2>
      </div>

      <!-- Edge case tooltip hover icon (?) -->
      <div class="group relative cursor-pointer" title="راهنما">
        <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold hover:bg-slate-200 transition-colors">
          ?
        </span>
        <div class="hidden group-hover:block absolute left-0 top-8 z-30 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-lg">
          سود مشخص‌شده به قیمت فاکتور یا لیست عمده‌فروش اضافه شده و روی سایت شما قرار می‌گیرد.
        </div>
      </div>
    </div>

    <!-- Radio Strategy Selection -->
    <div class="space-y-3 mb-6">
      <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
        <input 
          v-model="settings.strategy" 
          type="radio" 
          value="fixed_all" 
          class="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
        />
        <span class="text-xs font-bold text-slate-800">
          درصد سود ثابت روی تمام کالاها
        </span>
      </label>

      <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
        <input 
          v-model="settings.strategy" 
          type="radio" 
          value="by_category" 
          class="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
        />
        <span class="text-xs font-bold text-slate-800">
          تعیین سود بر اساس دسته‌بندی کالا
        </span>
      </label>
    </div>

    <!-- Fixed Profit Percentage Input -->
    <div v-if="settings.strategy === 'fixed_all'" class="mb-6">
      <label class="block text-xs font-bold text-slate-700 mb-2">
        چند درصد به قیمت عمده اضافه شود؟
      </label>
      <div class="relative max-w-xs">
        <input 
          v-model.number="settings.profitPercent" 
          type="number" 
          min="0" 
          max="200" 
          step="1" 
          class="w-full pr-4 pl-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
        />
        <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
          ٪
        </span>
      </div>
    </div>

    <!-- Category Rules (if by_category selected) -->
    <div v-else class="mb-6 space-y-2">
      <div 
        v-for="cat in settings.categoryRules" 
        :key="cat.id" 
        class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/80"
      >
        <span class="text-xs font-bold text-slate-800">{{ cat.name }}</span>
        <div class="flex items-center gap-1">
          <input 
            v-model.number="cat.profitPercent" 
            type="number" 
            class="w-16 px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-center font-mono"
          />
          <span class="text-xs text-slate-500 font-bold">٪</span>
        </div>
      </div>
    </div>

    <!-- Live Calculation Sandbox -->
    <div class="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-100 mb-6 flex items-center justify-between flex-wrap gap-2">
      <div class="text-xs text-slate-700 font-medium">
        اگر قیمت عمده <strong class="font-mono text-slate-900">۱۰۰,۰۰۰ تومان</strong> باشد ➔
      </div>
      <div class="text-xs text-blue-700 font-bold">
        قیمت در سایت شما: <span class="font-mono text-sm text-blue-900 font-black">{{ formatNumberFa(calculatedPrice) }} تومان</span> خواهد بود.
      </div>
    </div>

    <!-- Rounding Rule Dropdown -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        نحوه رند کردن قیمت:
      </label>
      <select 
        v-model="settings.roundingRule" 
        class="w-full max-w-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
      >
        <option value="round_1000">رند به بالا به نزدیک‌ترین ۱,۰۰۰ تومان (پیش‌فرض)</option>
        <option value="round_10000">رند به ۱۰,۰۰۰ تومان</option>
        <option value="no_rounding">بدون رند کردن</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calculator } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { PricingSettings } from '../types';

defineProps<{
  settings: PricingSettings;
  calculatedPrice: number;
}>();
</script>

