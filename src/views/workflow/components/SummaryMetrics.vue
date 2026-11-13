<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
    <!-- Synced Products (Green) -->
    <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-slate-500 mb-1">کالاهای هماهنگ</div>
        <div class="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
          {{ formatNumberFa(metrics.syncedProducts) }}
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
        <CheckCircle2 :size="24" />
      </div>
    </div>

    <!-- 24h Changes (Blue) -->
    <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-slate-500 mb-1">تغییرات ۲۴ ساعت گذشته</div>
        <div class="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
          {{ formatNumberFa(metrics.changes24h) }} کالا
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <Clock :size="24" />
      </div>
    </div>

    <!-- Errors Needing Review (Red / Warning) -->
    <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-slate-500 mb-1">خطاهای نیازمند بررسی</div>
        <div class="text-2xl sm:text-3xl font-black text-rose-600 font-mono">
          {{ formatNumberFa(metrics.errorsCount) }} مورد
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
        <AlertTriangle :size="24" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { DashboardMetrics } from '../types';

defineProps<{
  metrics: DashboardMetrics;
}>();
</script>

