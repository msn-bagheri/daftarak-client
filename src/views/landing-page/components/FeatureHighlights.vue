<template>
  <section id="features" class="py-16 bg-white border-y border-slate-100 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          چرا ویتریکس برای فروشگاه شما ضروری است؟
        </h2>
      </div>

      <!-- 3 Benefit Cards (No fluff, no technical specs) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Card 1 -->
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
              <TrendingUp :size="24" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              جلوگیری از ضرر نوسان ارز
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              قیمت‌ها با تغییر قیمت لیست عمده‌فروش، در کمتر از ۵ دقیقه در سایت شما اصلاح می‌شوند.
            </p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-pink-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-5">
              <ShieldCheck :size="24" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              خداحافظی با کالای ناموجود
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              وقتی تأمین‌کننده جنسی را ناموجود می‌کند، سایت شما خودکار فروش آن را می‌بندد.
            </p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
              <Calculator :size="24" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              رند کردن خودکار قیمت‌ها
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              قیمت‌های محاسبه‌شده خودکار به ارقام رند بازار (مثلاً مضرب ۱,۰۰۰ یا ۱۰,۰۰۰ تومان) تبدیل می‌شوند.
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { TrendingUp, ShieldCheck, Calculator } from 'lucide-vue-next';
</script>
