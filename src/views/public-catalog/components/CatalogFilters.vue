<template>
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
    
    <!-- Instant Search Bar -->
    <div class="relative flex-1 max-w-lg">
      <Search 
        :size="16" 
        class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
      />
      <input
        :value="searchQuery"
        type="text"
        placeholder="جستجوی نام کالا، مدل یا کد SKU..."
        class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
        @click="$emit('update:searchQuery', '')"
      >
        <X :size="14" />
      </button>
    </div>

    <!-- Right Controls: In-Stock Toggle & Sorting -->
    <div class="flex items-center gap-3 justify-between sm:justify-end">
      
      <!-- In-Stock Only Switch -->
      <label class="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700">
        <input
          :checked="onlyInStock"
          type="checkbox"
          class="sr-only peer"
          @change="$emit('update:onlyInStock', ($event.target as HTMLInputElement).checked)"
        />
        <div class="w-8 h-4.5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-600 relative"></div>
        <span>فقط کالاهای موجود</span>
      </label>

      <span class="text-slate-300">|</span>

      <!-- Sort Dropdown -->
      <div class="flex items-center gap-1.5 text-xs">
        <ArrowUpDown :size="13" class="text-slate-400" />
        <select
          :value="sortBy"
          class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value as SortOption)"
        >
          <option value="newest">جدیدترین‌ها</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Search, X, ArrowUpDown } from 'lucide-vue-next';
import type { SortOption } from '../types';

defineProps<{
  searchQuery: string;
  onlyInStock: boolean;
  sortBy: SortOption;
}>();

defineEmits<{
  (e: 'update:searchQuery', val: string): void;
  (e: 'update:onlyInStock', val: boolean): void;
  (e: 'update:sortBy', val: SortOption): void;
}>();
</script>

