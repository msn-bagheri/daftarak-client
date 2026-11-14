<template>
  <div v-if="progress" class="mb-6 p-5 rounded-2xl bg-white border border-blue-200 shadow-md animate-fade-in text-right">
    <!-- Header info -->
    <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div class="flex items-center gap-2.5">
        <div v-if="isFinished" class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 :size="18" />
        </div>
        <div v-else-if="progress.state === 'FAILURE'" class="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <AlertCircle :size="18" />
        </div>
        <div v-else class="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 animate-spin">
          <Loader2 :size="18" />
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-800">
            {{ isFinished ? 'عملیات ارسال به فروشگاه تکمیل شد' : 'در حال ارسال کالاها به ووکامرس (Celery Worker)...' }}
          </h4>
          <p v-if="progress.currentProduct && !isFinished" class="text-xs text-slate-500 truncate max-w-md mt-0.5">
            کالای فعلی: <span class="text-blue-700 font-semibold">{{ progress.currentProduct }}</span>
          </p>
        </div>
      </div>

      <!-- Percentage badge -->
      <div class="text-left font-mono">
        <span class="text-lg font-black text-blue-600">{{ formatNumberFa(progress.percent || 0) }}%</span>
      </div>
    </div>

    <!-- Progress bar track -->
    <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
      <div 
        class="h-full rounded-full transition-all duration-300 ease-out"
        :class="isFinished 
          ? 'bg-emerald-500' 
          : (progress.state === 'FAILURE' ? 'bg-rose-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600')"
        :style="{ width: `${Math.min(100, Math.max(0, progress.percent || 0))}%` }"
      ></div>
    </div>

    <!-- Footer Stats -->
    <div class="flex items-center justify-between mt-3 text-xs text-slate-600 flex-wrap gap-2">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1">
          <strong class="font-bold text-slate-800">{{ formatNumberFa(progress.current || 0) }}</strong>
          از
          <strong class="font-bold text-slate-800">{{ formatNumberFa(progress.total || 0) }}</strong>
          کالا پردازش شد
        </span>
      </div>

      <div class="flex items-center gap-2">
        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          موفق: {{ formatNumberFa(progress.published || 0) }}
        </span>
        <span v-if="progress.failed > 0" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          خطا: {{ formatNumberFa(progress.failed || 0) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { PublishProgress } from '../types';

const props = defineProps<{
  progress: PublishProgress | null;
}>();

const isFinished = computed(() => {
  return props.progress?.state === 'SUCCESS' || (props.progress?.percent ?? 0) >= 100;
});
</script>

