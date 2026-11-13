<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">
        لیست کالاها
      </h1>
    </div>

    <!-- Filter Bar: Search + Pills (همه | تغییر قیمت داشته‌ها | ناموجودها | بدون دسته) -->
    <CatalogFilterBar 
      v-model:search-query="searchQuery"
      v-model:active-filter="activeFilter"
    />

    <!-- Products List (Compact Cards) -->
    <div v-if="filteredProducts.length > 0" class="space-y-3">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
        @toggle="toggleProductActive" 
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white rounded-2xl border border-slate-200">
      <Package :size="48" class="text-slate-300 mx-auto mb-3" />
      <h3 class="text-base font-bold text-slate-800 mb-1">
        کالایی مطابق فیلتر یافت نشد
      </h3>
      <p class="text-xs text-slate-500">
        عبارت جستجو یا تب فیلتر را تغییر دهید.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package } from 'lucide-vue-next';
import { useCatalog } from './composables/useCatalog';
import CatalogFilterBar from './components/CatalogFilterBar.vue';
import ProductCard from './components/ProductCard.vue';

const {
  searchQuery,
  activeFilter,
  filteredProducts,
  toggleProductActive,
} = useCatalog();
</script>
