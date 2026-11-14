<template>
  <div class="px-5 py-3.5 bg-slate-50/70 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
    <!-- Items range info -->
    <div class="text-slate-500 font-medium">
      <span v-if="totalItems > 0">
        نمایش <strong class="text-slate-800 font-bold">{{ formatNumberFa(startIndex) }}</strong> تا
        <strong class="text-slate-800 font-bold">{{ formatNumberFa(endIndex) }}</strong> از
        <strong class="text-slate-800 font-bold">{{ formatNumberFa(totalItems) }}</strong> کالا
      </span>
      <span v-else>موردی یافت نشد</span>
    </div>

    <!-- Controls: Page size & Page buttons -->
    <div class="flex items-center gap-3 flex-wrap">
      <!-- Page Size Selector -->
      <div class="flex items-center gap-1.5 text-slate-600">
        <span class="text-slate-400">تعداد در صفحه:</span>
        <select
          :value="pageSize"
          class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs font-mono"
          @change="$emit('update:pageSize', Number(($event.target as HTMLSelectElement).value))"
        >
          <option :value="10">۱۰</option>
          <option :value="25">۲۵</option>
          <option :value="50">۵۰</option>
          <option :value="100">۱۰۰</option>
        </select>
      </div>

      <!-- Pagination Buttons -->
      <div v-if="totalPages > 1" class="flex items-center gap-1">
        <!-- First Page -->
        <button
          type="button"
          class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          :disabled="currentPage === 1"
          title="صفحه اول"
          @click="$emit('changePage', 1)"
        >
          <ChevronsRight :size="14" />
        </button>

        <!-- Previous Page -->
        <button
          type="button"
          class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          :disabled="currentPage === 1"
          title="صفحه قبل"
          @click="$emit('changePage', currentPage - 1)"
        >
          <ChevronRight :size="14" />
        </button>

        <!-- Dynamic Page Numbers -->
        <template v-for="(p, idx) in visiblePages" :key="idx">
          <span v-if="p === -1" class="px-1 text-slate-400">...</span>
          <button
            v-else
            type="button"
            class="min-w-7 h-7 px-2 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
            :class="p === currentPage 
              ? 'bg-blue-600 text-white shadow-2xs' 
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'"
            @click="$emit('changePage', p)"
          >
            {{ formatNumberFa(p) }}
          </button>
        </template>

        <!-- Next Page -->
        <button
          type="button"
          class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          :disabled="currentPage === totalPages"
          title="صفحه بعد"
          @click="$emit('changePage', currentPage + 1)"
        >
          <ChevronLeft :size="14" />
        </button>

        <!-- Last Page -->
        <button
          type="button"
          class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          :disabled="currentPage === totalPages"
          title="صفحه آخر"
          @click="$emit('changePage', totalPages)"
        >
          <ChevronsLeft :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';

const props = defineProps<{
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}>();

defineEmits<{
  (e: 'changePage', page: number): void;
  (e: 'update:pageSize', size: number): void;
}>();

// Generate a clean page window: e.g. [1, -1, 4, 5, 6, -1, 10]
const visiblePages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: number[] = [];
  pages.push(1);

  if (current > 3) {
    pages.push(-1);
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push(-1);
  }

  pages.push(total);
  return pages;
});
</script>

