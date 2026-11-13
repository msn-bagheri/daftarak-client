<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
    <!-- Search Input -->
    <div class="relative w-full sm:w-80">
      <Search :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input 
        :value="searchQuery" 
        type="text" 
        placeholder="جستجوی نام کالا یا کد SKU..." 
        class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Horizontal Filter Pills -->
    <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
      <button 
        type="button" 
        class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
        :class="activeFilter === 'all' 
          ? 'bg-slate-900 text-white shadow-xs' 
          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'"
        @click="$emit('update:activeFilter', 'all')"
      >
        همه
      </button>

      <button 
        type="button" 
        class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
        :class="activeFilter === 'price-changed' 
          ? 'bg-slate-900 text-white shadow-xs' 
          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'"
        @click="$emit('update:activeFilter', 'price-changed')"
      >
        تغییر قیمت داشته‌ها
      </button>

      <button 
        type="button" 
        class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
        :class="activeFilter === 'out-of-stock' 
          ? 'bg-slate-900 text-white shadow-xs' 
          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'"
        @click="$emit('update:activeFilter', 'out-of-stock')"
      >
        ناموجودها
      </button>

      <button 
        type="button" 
        class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
        :class="activeFilter === 'uncategorized' 
          ? 'bg-slate-900 text-white shadow-xs' 
          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'"
        @click="$emit('update:activeFilter', 'uncategorized')"
      >
        بدون دسته
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import type { CatalogFilterTab } from '../types';

defineProps<{
  searchQuery: string;
  activeFilter: CatalogFilterTab;
}>();

defineEmits<{
  (e: 'update:searchQuery', val: string): void;
  (e: 'update:activeFilter', val: CatalogFilterTab): void;
}>();
</script>

