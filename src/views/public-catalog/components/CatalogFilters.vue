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
      <button
        type="button"
        role="switch"
        :aria-checked="onlyInStock"
        class="flex items-center gap-2 cursor-pointer select-none group"
        @click="$emit('update:onlyInStock', !onlyInStock)"
      >
        <div
          dir="ltr"
          class="w-9 h-5 rounded-full transition-colors duration-200 ease-in-out p-0.5 flex items-center border"
          :class="onlyInStock 
            ? 'bg-emerald-600 border-emerald-600' 
            : 'bg-slate-300 hover:bg-slate-400/80 border-slate-400'"
        >
          <div
            class="w-4 h-4 bg-white rounded-full shadow-md border border-slate-200/60 transform transition-transform duration-200 ease-in-out"
            :class="onlyInStock ? 'translate-x-4' : 'translate-x-0'"
          ></div>
        </div>
        <span class="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
          فقط کالاهای موجود
        </span>
      </button>

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

