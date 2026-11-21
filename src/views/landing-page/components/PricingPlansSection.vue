<template>
  <section id="pricing" class="py-20 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
    
    <!-- Background Glows -->
    <div class="absolute top-1/4 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/4 -left-40 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-bold mb-4 shadow-2xs">
          <Sparkles :size="14" class="text-blue-600" />
          <span>پلن‌ها و تعرفه‌های اشتراک پلتفرم</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          سرمایه‌گذاری هوشمند برای <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">رشد و خودکارسازی</span> فروش
        </h2>
        <p class="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
          پلن مناسب کسب‌وکار خود را انتخاب کنید؛ بدون هزینه راه‌اندازی، بدون مالیات پنهان، همراه با ضمانت بازگشت وجه.
        </p>

        <!-- Billing Period Toggle -->
        <div class="mt-8 inline-flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <button
            type="button"
            class="px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
            :class="!isYearly ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'"
            @click="isYearly = false"
          >
            پرداخت ماهانه
          </button>

          <button
            type="button"
            class="px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5"
            :class="isYearly ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'"
            @click="isYearly = true"
          >
            <span>پرداخت سالانه</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-pink-100 text-pink-700">
              ۲۰٪ تخفیف
            </span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        
        <!-- ================= PLAN 1: STARTER ================= -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                فروشگاه‌های نوپا
              </span>
            </div>

            <h3 class="text-xl font-black text-slate-900">پلن استارتر</h3>
            <p class="text-xs text-slate-500 mt-1 min-h-[36px]">
              مناسب فروشگاه‌های نوپایی که به تازگی فعالیت خود را آغاز کرده‌اند.
            </p>

            <!-- Price -->
            <div class="py-6 border-b border-slate-100 flex items-baseline gap-1.5">
              <span class="text-3xl sm:text-4xl font-black text-slate-900">
                {{ formatNumberFa(isYearly ? 390000 : 490000) }}
              </span>
              <div class="text-xs font-bold text-slate-500">
                تومان <span class="text-slate-400 font-normal">/ ماه</span>
              </div>
            </div>

            <!-- Features List -->
            <ul class="py-6 space-y-3.5 text-xs text-slate-600">
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>همگام‌سازی تا <strong>۵۰۰ قلم کالا</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>به‌روزرسانی روزانه موجودی و قیمت</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>اتصال به <strong>۱ فروشگاه ووکامرس</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>اعمال فرمول سود ساده و رندسازی</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>کاتالوگ دیجیتال پایه</span>
              </li>
              <li class="flex items-center gap-2.5 text-slate-400">
                <Check :size="16" class="text-slate-300 shrink-0" />
                <span>پشتیبانی تیکتی (پاسخ‌گویی تا ۲۴ ساعت)</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all cursor-pointer select-none"
            @click="handleSelectPlan('starter')"
          >
            شروع دوره آزمایشی رایگان
          </button>
        </div>

        <!-- ================= PLAN 2: PROFESSIONAL (FEATURED) ================= -->
        <div class="bg-gradient-to-b from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative border-2 border-blue-500/80 transform lg:-translate-y-2">
          
          <!-- Popular Ribbon -->
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white text-[11px] font-black shadow-md tracking-wider">
            ⭐ پرطرفدارترین برای فروشگاه‌داران ترب
          </div>

          <div>
            <div class="flex items-center justify-between mb-4 mt-2">
              <span class="px-3 py-1 rounded-xl bg-blue-800/60 text-blue-200 text-xs font-bold border border-blue-700/60">
                ویژه فروشگاه‌داران ووکامرس
              </span>
            </div>

            <h3 class="text-xl font-black text-white">پلن حرفه‌ای (پرو)</h3>
            <p class="text-xs text-slate-300 mt-1 min-h-[36px]">
              طراحی‌شده برای فروشندگانی که در ترب، دیجی‌کالا و ایمالز رقابت می‌کنند.
            </p>

            <!-- Price -->
            <div class="py-6 border-b border-white/10 flex items-baseline gap-1.5">
              <span class="text-3xl sm:text-4xl font-black text-white">
                {{ formatNumberFa(isYearly ? 790000 : 990000) }}
              </span>
              <div class="text-xs font-bold text-slate-300">
                تومان <span class="text-slate-400 font-normal">/ ماه</span>
              </div>
            </div>

            <!-- Features List -->
            <ul class="py-6 space-y-3.5 text-xs text-slate-200">
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-400 shrink-0" />
                <span>تعداد کالاها: <strong>نامحدود</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-400 shrink-0" />
                <span><strong>همگام‌سازی سریع و لحظه‌ای</strong> موجودی و قیمت</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-400 shrink-0" />
                <span>ربات ضد لغو سفارش در <strong>ترب و دیجی‌کالا</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-400 shrink-0" />
                <span>فرمول سود پیشرفته، تخفیفات پلکانی و رندسازی تومان</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-400 shrink-0" />
                <span>اتصال هم‌زمان به <strong>چندین تأمین‌کننده</strong> و اکسل</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-400 shrink-0" />
                <span>پشتیبانی تلفنی و اولویت در پاسخگویی</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 hover:opacity-95 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 cursor-pointer select-none active:scale-[0.98]"
            @click="handleSelectPlan('professional')"
          >
            خرید و فعال‌سازی فوری اشتراک
          </button>
        </div>

        <!-- ================= PLAN 3: ENTERPRISE ================= -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                ویژه تأمین‌کنندگان و بنکداران
              </span>
            </div>

            <h3 class="text-xl font-black text-slate-900">پلن تجاری (B2B)</h3>
            <p class="text-xs text-slate-500 mt-1 min-h-[36px]">
              مخصوص بنکداران بازار، واردکنندگان و دفاتر پخش عمده کالا.
            </p>

            <!-- Price -->
            <div class="py-6 border-b border-slate-100 flex items-baseline gap-1.5">
              <span class="text-3xl sm:text-4xl font-black text-slate-900">
                {{ formatNumberFa(isYearly ? 1490000 : 1890000) }}
              </span>
              <div class="text-xs font-bold text-slate-500">
                تومان <span class="text-slate-400 font-normal">/ ماه</span>
              </div>
            </div>

            <!-- Features List -->
            <ul class="py-6 space-y-3.5 text-xs text-slate-600">
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>ویترین و کاتالوگ دیجیتال اختصاصی <strong>B2B</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>سامانه ثبت پیش‌فاکتور، <strong>چک صیادی و نسیه دفتری</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>اتصال کاتالوگ به شبکه فروشگاه‌داران متقاضی جنس</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>بارگذاری فوق‌سریع اکسل‌های حجیم (بالای ۵۰,۰۰۰ کالا)</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>امکان مخفی‌سازی قیمت‌ها برای همکاران سنتی</span>
              </li>
              <li class="flex items-center gap-2.5">
                <Check :size="16" class="text-emerald-600 shrink-0" />
                <span>پشتیبانی تلفنی اختصاصی VIP و مدیر حساب اختصاصی</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all cursor-pointer select-none"
            @click="handleSelectPlan('enterprise')"
          >
            انتخاب پلن تجاری
          </button>
        </div>

      </div>

      <!-- Trust Badges & Shaparak Compliance Guarantee -->
      <div class="mt-14 max-w-4xl mx-auto p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-right">
        
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck :size="20" />
          </div>
          <div>
            <div class="text-xs font-black text-slate-900">۷ روز ضمانت بازگشت ۱۰۰٪ وجه</div>
            <div class="text-[11px] text-slate-500 mt-0.5">در صورت عدم رضایت، بدون هیچ قید و شرطی وجه شما عودت داده می‌شود.</div>
          </div>
        </div>

        <div class="w-px h-8 bg-slate-200 hidden sm:block"></div>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Zap :size="20" />
          </div>
          <div>
            <div class="text-xs font-black text-slate-900">فعال‌سازی آنی و خودکار</div>
            <div class="text-[11px] text-slate-500 mt-0.5">بلافاصله پس از پرداخت آنلاین، سرویس شما فعال و آماده اتصال خواهد بود.</div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sparkles, Check, ShieldCheck, Zap } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';

const emit = defineEmits<{
  (e: 'select-plan', planId: string): void;
  (e: 'open-auth', mode?: 'login' | 'register'): void;
}>();

const isYearly = ref<boolean>(false);

function handleSelectPlan(planId: string) {
  emit('select-plan', planId);
  emit('open-auth', 'register');
}
</script>

