<template>
  <div class="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <ShieldAlert :size="18" />
        </div>
        <h2 class="text-base font-bold text-slate-900">
          محافظت از موجودی
        </h2>
      </div>

      <!-- Edge case tooltip hover icon (?) -->
      <div class="group relative cursor-pointer" title="راهنما">
        <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold hover:bg-slate-200 transition-colors">
          ?
        </span>
        <div class="hidden group-hover:block absolute left-0 top-8 z-30 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-lg">
          برای جلوگیری از فروش کالایی که عمده‌فروش موجودی اندک دارد و ممکن است سریع ناموجود شود.
        </div>
      </div>
    </div>

    <!-- Simple Toggle: بستن فروش کالاهای رو به اتمام -->
    <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 mb-5">
      <div>
        <div class="text-xs font-bold text-slate-800">
          بستن فروش کالاهای رو به اتمام
        </div>
        <div class="text-[11px] text-slate-500 mt-0.5">
          جلوگیری از ثبت سفارش برای کالاهایی با ریسک ناموجودی
        </div>
      </div>

      <label class="inline-flex items-center cursor-pointer select-none">
        <div 
          class="w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative"
          :class="settings.safetyThresholdEnabled ? 'bg-amber-500' : 'bg-slate-200'"
          @click.prevent="settings.safetyThresholdEnabled = !settings.safetyThresholdEnabled"
        >
          <div 
            class="w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out"
            :class="settings.safetyThresholdEnabled ? '-translate-x-5' : 'translate-x-0'"
          />
        </div>
      </label>
    </div>

    <!-- Threshold Input -->
    <div v-if="settings.safetyThresholdEnabled" class="animate-fade-in">
      <label class="block text-xs font-bold text-slate-700 mb-2">
        شرط ناموجود شدن در سایت:
      </label>

      <div class="flex items-center gap-3 flex-wrap">
        <span class="text-xs text-slate-600 font-medium">اگر موجودی عمده‌فروش کمتر از</span>
        <input 
          v-model.number="settings.safetyThresholdMinStock" 
          type="number" 
          min="1" 
          max="50" 
          class="w-20 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-bold text-center font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
        <span class="text-xs text-slate-600 font-medium">عدد شد، در سایت من ناموجود نمایش بده.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldAlert } from 'lucide-vue-next';
import type { PricingSettings } from '../types';

defineProps<{
  settings: PricingSettings;
}>();
</script>

