<template>
  <section class="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-pink-50/30">
    <!-- Ambient Radial Glows -->
    <div class="ambient-glow-blue -top-20 right-1/4"></div>
    <div class="ambient-glow-pink top-40 -left-20"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Top High-Trust Badge -->
      <div class="flex justify-center mb-6">
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-blue-200/80 text-slate-800 text-xs sm:text-sm shadow-sm backdrop-blur-md">
          <span class="flex h-2.5 w-2.5 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
          </span>
          <span class="text-slate-700 font-bold">راه‌اندازی در کمتر از ۲ دقیقه؛ بدون ریسک و بدون نیاز به کارت</span>
        </div>
      </div>

      <!-- Main Headline & Subheadline (Strict Spec: 1 line subtitle) -->
      <div class="text-center max-w-4xl mx-auto mb-10">
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.3] sm:leading-[1.25]">
          موجودی و قیمت ووکامرس شما،
          <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500">
            همیشه هماهنگ با عمده‌فروش.
          </span>
        </h1>

        <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
          اتصال مستقیم سایت شما به تأمین‌کنندگان بازار؛ بدون نیاز به تغییر دستی قیمت‌ها یا ثبت اکسل‌های تکراری.
        </p>
      </div>

      <!-- Call to Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <button
          v-if="isAuthenticated"
          type="button"
          class="btn-gradient-primary w-full sm:w-auto text-base !py-4 !px-8 shadow-xl shadow-pink-500/20 cursor-pointer"
          @click="$emit('navigate', 'workflow')"
        >
          <LayoutDashboard :size="20" class="text-pink-200" />
          <span>ورود به میز کار</span>
          <ArrowLeft :size="18" />
        </button>

        <button
          v-else
          type="button"
          class="btn-gradient-primary w-full sm:w-auto text-base !py-4 !px-8 shadow-xl shadow-pink-500/20 cursor-pointer"
          @click="$emit('open-auth', 'register')"
        >
          <Sparkles :size="20" class="text-pink-200" />
          <span>شروع تست رایگان ۱۴ روزه</span>
          <ArrowLeft :size="18" />
        </button>

        <button
          type="button"
          class="btn-white-secondary w-full sm:w-auto text-base !py-4 !px-7 cursor-pointer"
          @click="isAuthenticated ? $emit('navigate', 'workflow') : $emit('open-auth', 'register')"
        >
          <PlayCircle :size="20" class="text-blue-600" />
          <span>{{ isAuthenticated ? 'مشاهده وضعیت هماهنگی' : 'مشاهده نحوه کار (۱ دقیقه)' }}</span>
        </button>
      </div>

      <!-- Micro Trust Signals -->
      <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 mb-14 font-medium">
        <span class="flex items-center gap-1.5 text-slate-700">
          <CheckCircle2 :size="16" class="text-emerald-500" />
          <span>۱۴ روز استفاده رایگان</span>
        </span>
        <span class="text-slate-300 hidden sm:inline">•</span>
        <span class="flex items-center gap-1.5 text-slate-700">
          <CheckCircle2 :size="16" class="text-emerald-500" />
          <span>بدون نیاز به کارت بانکی</span>
        </span>
        <span class="text-slate-300 hidden sm:inline">•</span>
        <span class="flex items-center gap-1.5 text-slate-700">
          <CheckCircle2 :size="16" class="text-emerald-500" />
          <span>هماهنگی خودکار و بلادرنگ</span>
        </span>
      </div>

      <!-- Live Preview Card (Floating Hero Element) -->
      <div class="max-w-4xl mx-auto rounded-3xl bg-white/95 border border-slate-200/90 p-6 sm:p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-xl relative">
        <!-- Subtle Top Glow Gradient Line -->
        <div class="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 rounded-full"></div>

        <!-- Window Bar -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-rose-400"></span>
            <span class="w-3 h-3 rounded-full bg-amber-400"></span>
            <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span class="text-xs text-slate-400 mr-2 font-medium">نمای هماهنگی زنده قیمت و موجودی</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs text-emerald-600 font-bold">هماهنگ با فروشگاه</span>
          </div>
        </div>

        <!-- 3-Column Scenario Card: Supplier -> Arrow with Profit -> WooCommerce -->
        <div class="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          
          <!-- Right: Supplier (مبدأ / تأمین‌کننده) -->
          <div class="md:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded-full">
                تأمین‌کننده (عمده‌فروش)
              </span>
              <span class="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 :size="13" />
                <span>موجود در انبار</span>
              </span>
            </div>

            <h4 class="text-base font-bold text-slate-900 mb-3">
              هدفون بلوتوثی هیسکا مدل B12
            </h4>

            <div class="flex items-baseline justify-between border-t border-slate-200/70 pt-3">
              <span class="text-xs text-slate-500">قیمت خرید عمده:</span>
              <div class="text-left">
                <span class="text-xl font-black text-slate-900">۴۵۰,۰۰۰</span>
                <span class="text-xs text-slate-500 mr-1">تومان</span>
              </div>
            </div>
          </div>

          <!-- Center: Dynamic Profit Arrow -->
          <div class="md:col-span-1 flex flex-col items-center justify-center py-2">
            <div class="px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black shadow-md shadow-pink-500/20 whitespace-nowrap mb-1">
              +۲۰٪ سود شما
            </div>
            <div class="hidden md:flex text-pink-500">
              <ArrowLeft :size="22" class="animate-pulse" />
            </div>
            <div class="md:hidden text-pink-500">
              <ArrowDown :size="20" />
            </div>
          </div>

          <!-- Left: Your WooCommerce (سایت شما) -->
          <div class="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/30 border border-blue-200">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full">
                فروشگاه ووکامرس شما
              </span>
              <span class="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                وضعیت: آماده سفارش
              </span>
            </div>

            <h4 class="text-base font-bold text-slate-900 mb-3">
              هدفون بلوتوثی هیسکا مدل B12
            </h4>

            <div class="flex items-baseline justify-between border-t border-blue-100 pt-3">
              <span class="text-xs text-slate-600">قیمت در سایت شما:</span>
              <div class="text-left">
                <span class="text-2xl font-black text-blue-700">۵۴۰,۰۰۰</span>
                <span class="text-xs text-slate-500 mr-1">تومان</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Sparkles,
  ArrowLeft,
  ArrowDown,
  PlayCircle,
  CheckCircle2,
  LayoutDashboard,
} from 'lucide-vue-next';
import { useAuth } from '../../../composables/useAuth';
import type { NavTab } from '../types';

defineProps<{
  product?: any;
}>();

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
  (e: 'open-auth', mode: 'login' | 'register'): void;
}>();

const { isAuthenticated } = useAuth();
</script>
