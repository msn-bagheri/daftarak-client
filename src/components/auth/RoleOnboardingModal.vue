<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
    <div class="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-right overflow-hidden relative">
      
      <!-- Top Decorative Accent -->
      <div class="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>
      <div class="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-pink-500/10 blur-2xl pointer-events-none"></div>

      <!-- Welcome Title & Prompt -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2.5">
          <Sparkles :size="13" class="text-blue-500" />
          <span>شخصی‌سازی فضای کار</span>
        </div>

        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          به دفترک خوش آمدید! نقش اصلی شما چیست؟
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
          برای اینکه منوها و ابزارهای سامانه متناسب با نیاز دقیق شما چیده شوند، نوع فعالیت خود در بازار را مشخص کنید:
        </p>
      </div>

      <!-- Two Persona Choice Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        
        <!-- Card 1: Merchant / Retailer -->
        <div
          class="p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group select-none"
          :class="selectedRole === 'merchant'
            ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-500/10'
            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'"
          @click="selectedRole = 'merchant'"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div 
                class="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                :class="selectedRole === 'merchant' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-600'"
              >
                <Store :size="22" />
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-800">
                سایت ووکامرس
              </span>
            </div>

            <h3 class="text-sm font-black text-slate-900 mb-1.5">
              فروشگاه‌دار و خرده‌فروش
            </h3>
            <p class="text-[11px] text-slate-500 leading-relaxed mb-3">
              سایت یا غرفه فروشگاهی دارم و می‌خواهم موجودی و قیمت‌های سایتم از عمده‌فروشان خودکار آپدیت شود.
            </p>

            <ul class="text-[10px] text-slate-600 space-y-1">
              <li class="flex items-center gap-1.5">
                <Check :size="12" class="text-blue-600 shrink-0" />
                <span>اتصال به ووکامرس و دیجی‌کالا</span>
              </li>
              <li class="flex items-center gap-1.5">
                <Check :size="12" class="text-blue-600 shrink-0" />
                <span>فرمول محاسبه سود و قیمت‌گذاری</span>
              </li>
              <li class="flex items-center gap-1.5">
                <Check :size="12" class="text-blue-600 shrink-0" />
                <span>همگام‌سازی خودکار و لحظه‌ای انبار</span>
              </li>
            </ul>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>انتخاب این حالت</span>
            <ArrowLeft :size="14" class="group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        <!-- Card 2: Supplier / Wholesaler -->
        <div
          class="p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group select-none"
          :class="selectedRole === 'supplier'
            ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-500/10'
            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'"
          @click="selectedRole = 'supplier'"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div 
                class="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                :class="selectedRole === 'supplier' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-600'"
              >
                <Truck :size="22" />
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100/80 text-indigo-800">
                ویترین و کاتالوگ
              </span>
            </div>

            <h3 class="text-sm font-black text-slate-900 mb-1.5">
              تأمین‌کننده و عمده‌فروش
            </h3>
            <p class="text-[11px] text-slate-500 leading-relaxed mb-3">
              کالا در انبار دارم و یک ویترین و کاتالوگ دیجیتال می‌خواهم تا همکاران لیست کالا را ببینند و تلفنی سفارش دهند.
            </p>

            <ul class="text-[10px] text-slate-600 space-y-1">
              <li class="flex items-center gap-1.5">
                <Check :size="12" class="text-indigo-600 shrink-0" />
                <span>بدون نیاز به سایت ووکامرس</span>
              </li>
              <li class="flex items-center gap-1.5">
                <Check :size="12" class="text-indigo-600 shrink-0" />
                <span>لینک اختصاصی و تماس مستقیم تلفنی</span>
              </li>
              <li class="flex items-center gap-1.5">
                <Check :size="12" class="text-indigo-600 shrink-0" />
                <span>امکان مخفی کردن قیمت‌ها از رقبا</span>
              </li>
            </ul>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>انتخاب این حالت</span>
            <ArrowLeft :size="14" class="group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      <!-- Action Button -->
      <button
        type="button"
        class="w-full btn-gradient-primary text-sm !py-3 !px-6 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-pink-500/15"
        @click="handleConfirm"
      >
        <span>تأیید و ورود به میز کار اختصاصی</span>
        <ArrowLeft :size="16" />
      </button>

      <!-- Reassurance Note -->
      <div class="text-center mt-3 text-[11px] text-slate-400">
        نگران نباشید! در هر زمان می‌توانید از کلید بالای سربرگ، نقش خود را تغییر دهید.
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sparkles, Store, Truck, Check, ArrowLeft } from 'lucide-vue-next';
import type { UserRole } from '../../composables/useUserRole';

const props = defineProps<{
  initialRole?: UserRole;
}>();

const emit = defineEmits<{
  (e: 'complete', role: UserRole): void;
}>();

const selectedRole = ref<UserRole>(props.initialRole || 'merchant');

function handleConfirm() {
  emit('complete', selectedRole.value);
}
</script>

