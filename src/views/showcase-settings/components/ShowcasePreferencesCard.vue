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

        <label class="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            v-model="profile.showPrices"
            type="checkbox"
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <!-- Option 2: Allow Inquiry Order List -->
      <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 gap-4">
        <div>
          <div class="text-xs font-bold text-slate-800">فعال بودن «لیست استعلام و سفارش همکار»</div>
          <p class="text-[11px] text-slate-500 mt-0.5">
            خریداران می‌توانند چند قلم کالا را انتخاب کرده و لیست آماده سفارش را برای شما بخوانند یا در واتساپ ارسال کنند.
          </p>
        </div>

        <label class="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            v-model="profile.allowInquiryList"
            type="checkbox"
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
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

