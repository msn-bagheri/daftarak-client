<template>
  <div class="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs mb-6">
    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
      <Sliders :size="18" class="text-blue-600" />
      <h3 class="text-sm font-black text-slate-800">تنظیمات نحوه نمایش کاتالوگ و سفارش‌گیری</h3>
    </div>

    <div class="space-y-4">
      
      <!-- Option 1: Show Prices Toggle -->
      <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 gap-4">
        <div>
          <div class="text-xs font-bold text-slate-800">نمایش قیمت‌ها در کاتالوگ عمومی</div>
          <p class="text-[11px] text-slate-500 mt-0.5">
            اگر خاموش باشد، قیمت‌ها مخفی شده و به جای آن عبارت «استعلام تلفنی» درج می‌شود تا رقبا از قیمت‌های شما مطلع نشوند.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          :aria-checked="profile.showPrices"
          class="cursor-pointer select-none focus:outline-hidden"
          @click="profile.showPrices = !profile.showPrices"
        >
          <div
            dir="ltr"
            class="w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 flex items-center border"
            :class="profile.showPrices 
              ? 'bg-blue-600 border-blue-600' 
              : 'bg-slate-300 hover:bg-slate-400/80 border-slate-400'"
          >
            <div
              class="w-5 h-5 bg-white rounded-full shadow-md border border-slate-200/60 transform transition-transform duration-200 ease-in-out"
              :class="profile.showPrices ? 'translate-x-5' : 'translate-x-0'"
            ></div>
          </div>
        </button>
      </div>

      <!-- Option 2: Allow Inquiry Order List -->
      <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 gap-4">
        <div>
          <div class="text-xs font-bold text-slate-800">فعال بودن «لیست استعلام و سفارش همکار»</div>
          <p class="text-[11px] text-slate-500 mt-0.5">
            خریداران می‌توانند چند قلم کالا را انتخاب کرده و لیست آماده سفارش را برای شما بخوانند یا در واتساپ ارسال کنند.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          :aria-checked="profile.allowInquiryList"
          class="cursor-pointer select-none focus:outline-hidden"
          @click="profile.allowInquiryList = !profile.allowInquiryList"
        >
          <div
            dir="ltr"
            class="w-11 h-6 rounded-full transition-colors duration-200 ease-in-out p-0.5 flex items-center border"
            :class="profile.allowInquiryList 
              ? 'bg-blue-600 border-blue-600' 
              : 'bg-slate-300 hover:bg-slate-400/80 border-slate-400'"
          >
            <div
              class="w-5 h-5 bg-white rounded-full shadow-md border border-slate-200/60 transform transition-transform duration-200 ease-in-out"
              :class="profile.allowInquiryList ? 'translate-x-5' : 'translate-x-0'"
            ></div>
          </div>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Sliders } from 'lucide-vue-next';
import type { ShowcaseProfileData } from '../types';

defineProps<{
  profile: ShowcaseProfileData;
}>();
</script>

