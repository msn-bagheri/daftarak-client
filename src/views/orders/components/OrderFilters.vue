<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-2xs mb-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
    
    <!-- Status Filter Pills -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
      <button
        v-for="filter in statusFilters"
        :key="filter.value"
        type="button"
        class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none"
        :class="selectedStatus === filter.value
          ? 'bg-blue-600 text-white shadow-xs'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'"
        @click="$emit('update:selectedStatus', filter.value)"
      >
        <span>{{ filter.label }}</span>
        <span 
          v-if="filter.count !== undefined" 
          class="mr-1.5 px-1.5 py-0.2 rounded-full text-[10px]"
          :class="selectedStatus === filter.value ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'"
        >
          {{ formatNumberFa(filter.count) }}
        </span>
      </button>
    </div>

    <!-- Search Input -->
    <div class="relative w-full md:w-72">
      <Search :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        :value="searchQuery"
        type="text"
        placeholder="جستجوی نام همکار، شماره، شهر..."
        class="w-full text-xs pr-9 pl-8 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
        @click="$emit('update:searchQuery', '')"
      >
        <X :size="14" />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Search, X } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { OrderStats } from '../types';

const props = defineProps<{
  selectedStatus: string;
  searchQuery: string;
  stats: OrderStats;
}>();

defineEmits<{
  (e: 'update:selectedStatus', val: string): void;
  (e: 'update:searchQuery', val: string): void;
}>();

const statusFilters = computed(() => [
  { label: 'همه سفارش‌ها', value: 'all', count: props.stats.totalOrders },
  { label: 'در انتظار بررسی', value: 'pending', count: props.stats.pendingCount },
  { label: 'در حال آماده‌سازی', value: 'processing', count: props.stats.processingCount },
  { label: 'ارسال شده', value: 'shipped', count: props.stats.shippedCount },
  { label: 'لغو شده', value: 'cancelled' },
]);
</script>

