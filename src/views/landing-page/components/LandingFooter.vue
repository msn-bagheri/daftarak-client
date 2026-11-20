<template>
  <footer class="bg-white border-t border-slate-200/80 py-12 text-slate-600 text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
        
        <!-- Brand Info -->
        <div class="flex flex-col items-center sm:items-start gap-2">
          <DaftarakLogo 
            size="md" 
            variant="horizontal" 
            :show-persian-name="true" 
          />
          <p class="text-xs text-slate-500 font-medium">
            سامانه هوشمند همگام‌سازی کاتالوگ و به‌روزرسانی قیمت‌های ووکامرس
          </p>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
          <a href="#features" class="hover:text-blue-600 transition-colors">امکانات پلتفرم</a>
          <a href="#channels" class="hover:text-blue-600 transition-colors">کانال‌های متصل</a>
          <a href="#why-daftarak" class="hover:text-blue-600 transition-colors">مزایا و بازدهی</a>
          <button 
            type="button" 
            class="text-blue-600 hover:text-blue-700 font-bold transition-colors cursor-pointer"
            @click="$emit('navigate', 'workflow')"
          >
            ورود به پنل کاربری
          </button>
        </div>

        <!-- Enamad Trust Seal Badge -->
        <div class="flex items-center justify-center">
          <div class="p-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl shadow-2xs hover:shadow-md transition-all flex items-center justify-center">
            <a 
              referrerpolicy="origin" 
              target="_blank" 
              href="https://trustseal.enamad.ir/?id=8813716&Code=90VrQ3SEXBWLMqLLWOtZe5YGdiM3Ndvo"
              title="نماد اعتماد الکترونیکی دفترک"
              class="block"
            >
              <img 
                referrerpolicy="origin" 
                src="https://trustseal.enamad.ir/logo.aspx?id=8813716&Code=90VrQ3SEXBWLMqLLWOtZe5YGdiM3Ndvo" 
                alt="نماد اعتماد الکترونیکی دفترک" 
                style="cursor:pointer" 
                code="90VrQ3SEXBWLMqLLWOtZe5YGdiM3Ndvo"
                class="w-16 h-16 sm:w-20 sm:h-20 object-contain select-none"
              />
            </a>
          </div>
        </div>

      </div>

      <!-- Copyright & Version -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© تمامی حقوق محفوظ است — پلتفرم ابری دفترک</p>
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="text-slate-500 font-medium">وضعیت سرویس‌ها: آنلاین و پایدار (۹۹.۹۸٪)</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import DaftarakLogo from '../../../components/brand/DaftarakLogo.vue';
import type { NavTab } from '../types';

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
}>();
</script>
