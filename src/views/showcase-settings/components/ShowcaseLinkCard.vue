<template>
  <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-xl shadow-blue-500/15 mb-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
      
      <!-- Info Left -->
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-3 backdrop-blur-xs">
          <Globe :size="13" />
          <span>ویترین و کاتالوگ عمومی شما فعال است</span>
        </div>

        <h2 class="text-lg sm:text-xl font-black text-white">
          لینک اختصاصی کاتالوگ برای مشتریان و همکاران
        </h2>
        <p class="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl leading-relaxed">
          این لینک را در بیو اینستاگرام، کانال تلگرام، واتساپ یا پیامک به خریداران بفرستید تا بدون نیاز به ورود به سامانه، ویترین آنلاین محصولات شما را مشاهده کرده و مستقیماً تماس بگیرند.
        </p>
      </div>

      <!-- Actions Right -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
        <!-- Copy Link Button -->
        <button
          type="button"
          class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 select-none"
          @click="handleCopy"
        >
          <Copy :size="15" />
          <span>{{ copied ? 'کپی شد!' : 'کپی لینک کاتالوگ' }}</span>
        </button>

        <!-- Preview Catalog Button -->
        <a
          :href="catalogUrl"
          target="_blank"
          class="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-xs transition-colors select-none"
        >
          <ExternalLink :size="15" />
          <span>مشاهده زنده ویترین</span>
        </a>
      </div>

    </div>

    <!-- URL Box Bar -->
    <div class="mt-4 pt-4 border-t border-white/15 flex items-center justify-between gap-2 text-xs font-mono bg-black/10 px-3.5 py-2.5 rounded-xl" dir="ltr">
      <span class="truncate text-blue-100">{{ catalogUrl }}</span>
      <span class="text-[10px] text-emerald-300 font-sans font-bold shrink-0">آماده اشتراک‌گذاری</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Globe, Copy, ExternalLink } from 'lucide-vue-next';

const props = defineProps<{
  catalogUrl: string;
  onCopy: () => boolean;
}>();

const copied = ref(false);

function handleCopy() {
  props.onCopy();
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2500);
}
</script>

