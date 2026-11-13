<template>
  <section id="why-vitrix" class="py-20 bg-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          اثرات واقعی برای کسب‌وکار شما
        </span>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          چرا فروشندگان موفق، فروش خود را به ویتریکس می‌سپارند؟
        </h2>
        <p class="mt-3 text-base text-slate-600">
          تفاوت بین کار دستی پراشتباه و اتوماسیون دقیق در اعداد زیر خلاصه می‌شود:
        </p>
      </div>

      <!-- 4 Trust & Impact Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="stat in metrics"
          :key="stat.id"
          class="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/5 transition-all text-center flex flex-col items-center justify-between group"
        >
          <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-50 to-pink-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <component :is="resolveIcon(stat.iconName)" :size="24" />
          </div>

          <div class="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 font-mono tracking-tight mb-2">
            {{ stat.value }}
          </div>

          <h3 class="text-base font-bold text-slate-800 mb-2">
            {{ stat.label }}
          </h3>

          <p class="text-xs text-slate-500 leading-relaxed">
            {{ stat.description }}
          </p>
        </div>
      </div>

      <!-- Comparison Callout Box -->
      <div class="mt-14 p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-pink-50 border border-blue-200/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-5">
          <div class="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-pink-600 shrink-0">
            <ShieldCheck :size="30" />
          </div>
          <div>
            <h4 class="text-lg font-bold text-slate-900 mb-1">
              تضمین سلامت اکانت فروشندگی و عدم کسر امتیاز
            </h4>
            <p class="text-sm text-slate-600">
              با مانیتورینگ لحظه‌ای، تأخیر در ارسال و لغو سفارش ناشی از عدم موجودی به صفر می‌رسد و نشان فروشنده برگزیده را حفظ می‌کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          class="btn-gradient-primary shrink-0 text-sm !py-3 !px-6 cursor-pointer"
          @click="isAuthenticated ? $emit('navigate', 'workflow') : $emit('open-auth', 'register')"
        >
          <span>{{ isAuthenticated ? 'ورود به میز کار' : 'تست رایگان فروشگاه شما' }}</span>
          <ArrowLeft :size="16" />
        </button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowLeft
} from 'lucide-vue-next';
import { useAuth } from '../../../composables/useAuth';
import type { TrustMetric, NavTab } from '../types';

defineProps<{
  metrics: TrustMetric[];
}>();

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
  (e: 'open-auth', mode?: 'login' | 'register'): void;
}>();

const { isAuthenticated } = useAuth();

function resolveIcon(name: string) {
  switch (name) {
    case 'Zap': return Zap;
    case 'ShieldCheck': return ShieldCheck;
    case 'TrendingUp': return TrendingUp;
    case 'Clock': return Clock;
    default: return Zap;
  }
}
</script>

