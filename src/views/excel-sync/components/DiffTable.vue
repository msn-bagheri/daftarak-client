<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-24">
    <!-- Filter & Search Toolbar -->
    <div class="p-4 bg-slate-50/50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
      <!-- Search Box -->
      <div class="relative w-full sm:w-72">
        <input
          :value="searchQuery"
          type="text"
          placeholder="جستجوی نام یا کد کالا (SKU)..."
          class="w-full pl-8 pr-9 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          @input="setSearch(($event.target as HTMLInputElement).value)"
        />
        <Search :size="15" class="absolute right-3 top-2.5 text-slate-400" />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute left-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          @click="setSearch('')"
        >
          <X :size="14" />
        </button>
      </div>

      <!-- Filter Pills -->
      <div class="flex items-center gap-1.5 flex-wrap text-xs">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeFilter === 'all' 
            ? 'bg-blue-600 text-white shadow-2xs' 
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'"
          @click="setFilter('all')"
        >
          <span>همه کالاها</span>
          <span class="font-mono text-[11px] opacity-80">({{ formatNumberFa(allItems.length) }})</span>
        </button>

        <button
          v-if="changedCount > 0"
          type="button"
          class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeFilter === 'changed' 
            ? 'bg-blue-600 text-white shadow-2xs' 
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'"
          @click="setFilter('changed')"
        >
          <span>دارای تغییر</span>
          <span class="font-mono text-[11px] opacity-80">({{ formatNumberFa(changedCount) }})</span>
        </button>

        <button
          v-if="createdCount > 0"
          type="button"
          class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeFilter === 'created' 
            ? 'bg-blue-600 text-white shadow-2xs' 
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'"
          @click="setFilter('created')"
        >
          <span>کالاهای جدید</span>
          <span class="font-mono text-[11px] opacity-80">({{ formatNumberFa(createdCount) }})</span>
        </button>

        <button
          v-if="priceChangedCount > 0"
          type="button"
          class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeFilter === 'price_changed' 
            ? 'bg-blue-600 text-white shadow-2xs' 
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'"
          @click="setFilter('price_changed')"
        >
          <span>تغییر قیمت</span>
          <span class="font-mono text-[11px] opacity-80">({{ formatNumberFa(priceChangedCount) }})</span>
        </button>

        <button
          v-if="outOfStockCount > 0"
          type="button"
          class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeFilter === 'out_of_stock' 
            ? 'bg-blue-600 text-white shadow-2xs' 
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'"
          @click="setFilter('out_of_stock')"
        >
          <span>ناموجود</span>
          <span class="font-mono text-[11px] opacity-80">({{ formatNumberFa(outOfStockCount) }})</span>
        </button>
      </div>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto">
      <table class="w-full text-right text-sm">
        <thead class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600">
          <tr>
            <th class="py-3.5 px-5">نام کالا</th>
            <th class="py-3.5 px-5">قیمت قبلی</th>
            <th class="py-3.5 px-5">قیمت جدید</th>
            <th class="py-3.5 px-5">وضعیت موجودی</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr 
            v-for="item in paginatedItems" 
            :key="item.row_number"
            class="hover:bg-slate-50/50 transition-colors"
          >
            <!-- Column 1: نام کالا (همراه با کد یا SKU) -->
            <td class="py-3.5 px-5">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-800">{{ item.product_name || item.excel_name }}</span>
                <span 
                  v-if="item.match_type === 'created'" 
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0"
                >
                  کالای جدید
                </span>
                <span 
                  v-else-if="item.diff?.has_changes" 
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0"
                >
                  تغییر یافته
                </span>
                <span 
                  v-else 
                  class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-200 shrink-0"
                >
                  هماهنگ
                </span>
              </div>
              <div class="text-[11px] text-slate-400 font-mono">{{ item.excel_sku }}</div>
            </td>

            <!-- Column 2: قیمت قبلی -->
            <td class="py-3.5 px-5 whitespace-nowrap">
              <span 
                v-if="item.diff?.changes?.regular_price" 
                class="line-through text-slate-400 text-xs font-mono"
              >
                {{ formatNumberFa(item.diff.changes.regular_price.old || '—') }} تومان
              </span>
              <span v-else class="text-slate-500 text-xs font-mono">
                {{ formatNumberFa(item.current_price || '—') }} تومان
              </span>
            </td>

            <!-- Column 3: قیمت جدید -->
            <td class="py-3.5 px-5 whitespace-nowrap">
              <span 
                v-if="item.diff?.changes?.regular_price" 
                class="font-bold text-emerald-600 text-sm font-mono"
              >
                {{ formatNumberFa(item.diff.changes.regular_price.new) }} تومان
              </span>
              <span v-else class="text-slate-700 text-xs font-mono">
                {{ formatNumberFa(item.current_price || '—') }} تومان
              </span>
            </td>

            <!-- Column 4: وضعیت موجودی -->
            <td class="py-3.5 px-5 whitespace-nowrap">
              <span 
                v-if="isOutOfStock(item)"
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200"
              >
                ناموجود
              </span>
              <span 
                v-else
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                موجود
              </span>
            </td>
          </tr>

          <!-- Empty Search State -->
          <tr v-if="paginatedItems.length === 0">
            <td colspan="4" class="py-12 text-center text-slate-400 text-xs">
              هیچ کالایی با فیلتر یا جستجوی انتخابی یافت نشد.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <TablePagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total-pages="totalPages"
      :total-items="totalItems"
      :start-index="startIndex"
      :end-index="endIndex"
      @change-page="setPage"
      @update:page-size="setPageSize"
    />

    <!-- Sticky Action Footer with Single Primary Button -->
    <div class="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg flex items-center justify-between z-20">
      <div class="text-xs text-slate-600 font-medium hidden sm:block">
        با اعمال تغییرات، قیمت‌ها و موجودی بلافاصله در فروشگاه شما به‌روز خواهند شد.
      </div>

      <button 
        type="button" 
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        :disabled="isCommitting || allItems.length === 0"
        @click="$emit('commit')"
      >
        <span>
          {{ isCommitting ? 'در حال اعمال روی فروشگاه...' : `اعمال تغییرات روی فروشگاه (${formatNumberFa(allItems.length)} کالا)` }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Search, X } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { MatchedItem } from '../types';
import { usePagination } from '../composables/usePagination';
import TablePagination from './TablePagination.vue';

const props = defineProps<{
  items: MatchedItem[];
  isCommitting: boolean;
}>();

defineEmits<{
  (e: 'commit'): void;
}>();

const allItems = computed(() => {
  return props.items || [];
});

function isOutOfStock(item: MatchedItem): boolean {
  if (item.diff?.changes?.stock_quantity) {
    return item.diff.changes.stock_quantity.new === 0;
  }
  return item.current_stock === 0;
}

const changedCount = computed(() => {
  return allItems.value.filter(i => i.diff?.has_changes).length;
});

const createdCount = computed(() => {
  return allItems.value.filter(i => i.match_type === 'created').length;
});

const priceChangedCount = computed(() => {
  return allItems.value.filter(i => i.diff?.changes?.regular_price !== undefined).length;
});

const outOfStockCount = computed(() => {
  return allItems.value.filter(i => isOutOfStock(i)).length;
});

const {
  currentPage,
  pageSize,
  searchQuery,
  activeFilter,
  totalItems,
  totalPages,
  startIndex,
  endIndex,
  paginatedItems,
  setPage,
  setPageSize,
  setFilter,
  setSearch,
} = usePagination(allItems);
</script>
