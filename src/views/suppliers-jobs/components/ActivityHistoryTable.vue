<template>
  <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden mt-8">
    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
      <h3 class="text-sm font-bold text-slate-900">
        گزارش فعالیت‌ها و بررسی‌های اخیر
      </h3>
      <span class="text-xs text-slate-400 font-medium">
        ثبت رویدادهای زنده
      </span>
    </div>

    <div class="divide-y divide-slate-100">
      <div 
        v-for="log in logs" 
        :key="log.id" 
        class="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
      >
        <div class="flex items-center gap-3">
          <span 
            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            :class="log.level === 'success' 
              ? 'bg-emerald-50 text-emerald-600' 
              : log.level === 'warning' 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-blue-50 text-blue-600'"
          >
            <CheckCircle2 v-if="log.level === 'success'" :size="16" />
            <AlertTriangle v-else-if="log.level === 'warning'" :size="16" />
            <Info v-else :size="16" />
          </span>

          <span class="text-xs font-bold text-slate-800 leading-snug">
            {{ log.message }}
          </span>
        </div>

        <span class="text-xs text-slate-400 font-medium whitespace-nowrap">
          {{ log.timestamp }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, AlertTriangle, Info } from 'lucide-vue-next';
import type { ActivityLogItem } from '../types';

defineProps<{
  logs: ActivityLogItem[];
}>();
</script>

