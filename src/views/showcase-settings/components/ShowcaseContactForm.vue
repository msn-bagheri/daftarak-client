<template>
  <div class="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs mb-6">
    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
      <Phone :size="18" class="text-blue-600" />
      <h3 class="text-sm font-black text-slate-800">اطلاعات تماس و هویت کسب‌وکار</h3>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <!-- Store Name (Mandatory) -->
      <div class="sm:col-span-2">
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          نام فروشگاه / بازرگانی <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="profile.name"
          type="text"
          placeholder="مثلاً: بازرگانی پارس (واردکننده لوازم جانبی)"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <!-- Primary Phone (Mandatory) -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          شماره تلفن تماس اصلی (اجباری) <span class="text-rose-500">*</span>
        </label>
        <div class="relative">
          <input
            v-model="profile.phone"
            type="text"
            placeholder="02166708090 یا 0912..."
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-left"
            dir="ltr"
          />
        </div>
        <p class="text-[11px] text-slate-400 mt-1">خریداران با زدن دکمه «تماس» در کاتالوگ، مستقیماً با این شماره تماس می‌گیرند.</p>
      </div>

      <!-- WhatsApp Number (Optional) -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          شماره پیام‌رسان واتساپ / ایتا (اختیاری)
        </label>
        <input
          v-model="profile.whatsappNumber"
          type="text"
          placeholder="09121234567"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-left"
          dir="ltr"
        />
        <p class="text-[11px] text-slate-400 mt-1">در صورت ثبت، دکمه چت در پیام‌رسان‌ها نیز در کنار تماس فعال می‌شود.</p>
      </div>

      <!-- Secondary Phone (Optional) -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          شماره تلفن دوم یا پشتیبان (اختیاری)
        </label>
        <input
          v-model="profile.secondaryPhone"
          type="text"
          placeholder="0912..."
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-left"
          dir="ltr"
        />
      </div>

      <!-- Working Hours (Optional) -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          ساعات کاری و پاسخگویی تلفنی (اختیاری)
        </label>
        <input
          v-model="profile.workingHours"
          type="text"
          placeholder="شنبه تا چهارشنبه ۹ الی ۱۸"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <!-- Bio / Description (Optional) -->
      <div class="sm:col-span-2">
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          معرفی کوتاه یا شعار تجاری (اختیاری)
        </label>
        <textarea
          v-model="profile.bio"
          rows="2"
          placeholder="مثلاً: پخش مستقیم انواع قاب، گلس و شارژر با ضمانت بازگشت وجه و ارسال فوری به سراسر کشور"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
        ></textarea>
      </div>

      <!-- Address (Optional) -->
      <div class="sm:col-span-2">
        <label class="block text-xs font-bold text-slate-700 mb-1.5">
          آدرس فروشگاه یا انبار حضوری (اختیاری)
        </label>
        <input
          v-model="profile.address"
          type="text"
          placeholder="مثلاً: تهران، بازار بزرگ، پاساژ..."
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Phone } from 'lucide-vue-next';
import type { ShowcaseProfileData } from '../types';

defineProps<{
  profile: ShowcaseProfileData;
}>();
</script>

