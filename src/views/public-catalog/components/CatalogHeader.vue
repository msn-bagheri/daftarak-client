<template>
  <header class="bg-white border-b border-slate-200/90 shadow-2xs sticky top-0 z-40 backdrop-blur-md bg-white/95">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <!-- Left: Supplier Brand Info -->
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 shrink-0">
            <Store :size="26" />
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-base sm:text-lg font-black text-slate-900 truncate tracking-tight">
                {{ profile.name }}
              </h1>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <CheckCircle :size="12" />
                تأمین‌کننده تأیید شده
              </span>
            </div>

            <p v-if="profile.bio" class="text-xs text-slate-500 truncate mt-0.5">
              {{ profile.bio }}
            </p>
          </div>
        </div>

        <!-- Right: Primary Contact Actions (Phone Call is Main) -->
        <div class="flex items-center gap-2.5 shrink-0">
          <!-- Primary: Direct Phone Call Button -->
          <a
            :href="`tel:${profile.phone}`"
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all select-none"
            title="تماس تلفنی مستقیم برای سفارش و استعلام"
          >
            <PhoneCall :size="16" class="animate-pulse" />
            <span>تماس مستقیم: {{ profile.phone }}</span>
          </a>

          <!-- Optional WhatsApp / Messenger -->
          <a
            v-if="profile.whatsappNumber"
            :href="`https://wa.me/98${formatWhatsappNumber(profile.whatsappNumber)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-emerald-600 transition-colors shrink-0"
            title="ارسال پیام در واتساپ"
          >
            <MessageCircle :size="18" />
          </a>

          <!-- Share Catalog Link -->
          <button
            type="button"
            class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shrink-0 cursor-pointer"
            title="اشتراک‌گذاری لینک کاتالوگ"
            @click="copyCatalogLink"
          >
            <Share2 :size="18" />
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Store, CheckCircle, PhoneCall, MessageCircle, Share2 } from 'lucide-vue-next';
import type { SupplierProfile } from '../types';

const props = defineProps<{
  profile: SupplierProfile;
}>();

function formatWhatsappNumber(num: string): string {
  return num.replace(/^0+/, '');
}

function copyCatalogLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('لینک این کاتالوگ در حافظه کپی شد.');
}
</script>

