<template>
  <div class="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs mb-6">
    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
      <Sliders :size="18" class="text-blue-600" />
      <h3 class="text-sm font-black text-slate-800">تنظیمات نحوه نمایش کاتالوگ و شرایط سفارش‌گیری</h3>
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
            خریداران می‌توانند اقلام را انتخاب کرده و مستقیماً پیش‌فاکتور رسمی برای شما ثبت کنند یا در واتساپ بفرستند.
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

      <!-- Section: B2B Settlement Terms Allowed by Supplier -->
      <div class="pt-3 border-t border-slate-100">
        <div class="flex items-center gap-2 mb-2">
          <Receipt :size="16" class="text-indigo-600" />
          <span class="text-xs font-black text-slate-800">شرایط و شیوه‌های تسویه‌حساب مجاز همکاران</span>
        </div>
        <p class="text-[11px] text-slate-500 mb-3">
          خریدار هنگام ثبت پیش‌فاکتور، تنها می‌تواند از بین گزینه‌های فعال زیر درخواست تسویه دهد:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Cash Term -->
          <label 
            class="flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all select-none"
            :class="profile.acceptsCash ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white opacity-70'"
          >
            <input 
              type="checkbox" 
              v-model="profile.acceptsCash" 
              class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <div>
              <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CreditCard :size="13" class="text-blue-600" />
                <span>تسویه نقدی</span>
              </div>
              <span class="text-[10px] text-slate-500">واریز آنی کارت یا فیش</span>
            </div>
          </label>

          <!-- Cheque Term -->
          <label 
            class="flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all select-none"
            :class="profile.acceptsCheque ? 'border-amber-200 bg-amber-50/50' : 'border-slate-200 bg-white opacity-70'"
          >
            <input 
              type="checkbox" 
              v-model="profile.acceptsCheque" 
              class="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
            />
            <div>
              <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileCheck :size="13" class="text-amber-600" />
                <span>چک صیادی</span>
              </div>
              <span class="text-[10px] text-slate-500">مدت‌دار همکار با استعلام</span>
            </div>
          </label>

          <!-- Credit / Ledger Term -->
          <label 
            class="flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all select-none"
            :class="profile.acceptsCredit ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-white opacity-70'"
          >
            <input 
              type="checkbox" 
              v-model="profile.acceptsCredit" 
              class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <div>
              <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Handshake :size="13" class="text-emerald-600" />
                <span>حساب دفتری (نسیه)</span>
              </div>
              <span class="text-[10px] text-slate-500">برای همکاران معتبر</span>
            </div>
          </label>

        </div>
      </div>

      <!-- Shipping Notes -->
      <div class="pt-2">
        <label class="block text-xs font-bold text-slate-700 mb-1">توضیحات و شرایط ارسال باربری / پیک</label>
        <input
          v-model="profile.shippingNotes"
          type="text"
          placeholder="مثال: ارسال روزانه با باربری وطن، تیپاکس و پیک در تهران"
          class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Sliders, Receipt, CreditCard, FileCheck, Handshake } from 'lucide-vue-next';
import type { ShowcaseProfileData } from '../types';

defineProps<{
  profile: ShowcaseProfileData;
}>();
</script>
