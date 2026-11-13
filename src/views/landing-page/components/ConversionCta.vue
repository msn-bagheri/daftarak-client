<template>
  <section id="cta" class="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Big Gradient Call-to-Action Card -->
      <div class="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 p-8 sm:p-14 text-white shadow-2xl shadow-pink-500/20 relative overflow-hidden text-center md:text-right flex flex-col md:flex-row items-center justify-between gap-8">
        
        <!-- Background Ambient Circles -->
        <div class="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-pink-400/20 blur-2xl pointer-events-none"></div>

        <div class="max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-md">
            <Sparkles :size="14" class="text-pink-200" />
            <span>شروع بدون ریسک در ۲ دقیقه</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            آماده‌اید فروشگاه خود را روی خلبان خودکار بگذارید؟
          </h2>

          <p class="text-blue-100 text-base sm:text-lg leading-relaxed font-normal">
            همین امروز به جمع صدها فروشنده هوشمند بپیوندید.
            ۱۴ روز فرصت دارید تمام امکانات را بدون پرداخت هزینه امتحان کنید.
          </p>

          <div class="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-blue-100 font-medium">
            <span class="flex items-center gap-1.5">
              <Check :size="16" class="text-white" />
              <span>بدون نیاز به ثبت کارت بانکی</span>
            </span>
            <span class="opacity-60 hidden sm:inline">•</span>
            <span class="flex items-center gap-1.5">
              <Check :size="16" class="text-white" />
              <span>پشتیبانی و راه‌اندازی سریع</span>
            </span>
            <span class="opacity-60 hidden sm:inline">•</span>
            <span class="flex items-center gap-1.5">
              <Check :size="16" class="text-white" />
              <span>لغو اشتراک در هر زمان</span>
            </span>
          </div>
        </div>

        <!-- Action Button -->
        <div class="relative z-10 shrink-0 flex flex-col items-center gap-3">
          <button
            type="button"
            class="px-8 py-4 rounded-2xl bg-white text-blue-900 font-black text-base hover:bg-slate-50 hover:shadow-2xl hover:scale-105 active:scale-100 transition-all flex items-center gap-3 shadow-xl cursor-pointer"
            @click="isAuthenticated ? $emit('navigate', 'workflow') : $emit('open-auth', 'register')"
          >
            <span>{{ isAuthenticated ? 'ورود به میز کار فروشگاه' : 'شروع رایگان و اتصال فروشگاه' }}</span>
            <ArrowLeft :size="20" class="text-pink-600" />
          </button>

          <span class="text-xs text-blue-100/80 font-medium">
            اتصال در کمتر از ۲ دقیقه
          </span>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Sparkles, ArrowLeft, Check } from 'lucide-vue-next';
import { useAuth } from '../../../composables/useAuth';
import type { NavTab } from '../types';

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
  (e: 'open-auth', mode?: 'login' | 'register'): void;
}>();

const { isAuthenticated } = useAuth();
</script>

