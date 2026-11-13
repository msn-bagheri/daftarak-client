<template>
  <div class="bg-gradient-to-l from-blue-50/70 to-indigo-50/40 rounded-2xl border border-blue-100 p-5 mb-8">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Sparkles :size="18" class="text-blue-600" />
        <h3 class="text-sm font-bold text-slate-900">
          چک‌لیست راه‌اندازی فروشگاه شما
        </h3>
      </div>
      <span class="text-xs font-bold text-blue-700">
        {{ toPersianDigits(completedCount) }} از {{ toPersianDigits(items.length) }} مرحله انجام شده
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-2 cursor-pointer hover:border-blue-300 transition-colors"
        @click="$emit('navigate', item.targetTab)"
      >
        <span class="text-xs font-medium text-slate-800 leading-snug">
          {{ item.title }}
        </span>
        <span 
          class="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          :class="item.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'"
        >
          <Check :size="12" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Sparkles, Check } from 'lucide-vue-next';
import { toPersianDigits } from '../../../utils/formatters';
import type { OnboardingChecklistItem } from '../types';
import type { NavTab } from '../../../App.vue';

const props = defineProps<{
  items: OnboardingChecklistItem[];
}>();

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
}>();

const completedCount = computed(() => {
  return props.items.filter(item => item.isCompleted).length;
});
</script>

