<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs mb-8">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-base font-bold text-slate-900">
        وضعیت مراحل هماهنگی خودکار
      </h3>
      <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
        هماهنگی خودکار فعال است
      </span>
    </div>

    <!-- 5-Step Horizontal Pipeline -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative">
      <div 
        v-for="(step, index) in steps" 
        :key="step.id"
        class="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 relative hover:bg-slate-50 transition-colors cursor-pointer"
        @click="$emit('navigate', step.targetTab)"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
            <Check :size="14" />
          </span>
          <span class="text-[11px] font-bold text-slate-400">
            مرحله {{ toPersianDigits(index + 1) }}
          </span>
        </div>

        <div class="text-sm font-bold text-slate-800 mb-1">
          {{ step.title }}
        </div>

        <div class="text-xs text-slate-500 font-medium">
          {{ step.statusInfo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { toPersianDigits } from '../../../utils/formatters';
import type { LinearStep } from '../types';
import type { NavTab } from '../../../App.vue';

defineProps<{
  steps: LinearStep[];
}>();

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
}>();
</script>

