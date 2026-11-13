import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { MatchedItem } from '../types';

export type DiffFilterType = 'all' | 'changed' | 'created' | 'price_changed' | 'out_of_stock' | 'unchanged';

export function usePagination(items: Ref<MatchedItem[]> | ComputedRef<MatchedItem[]>) {
  const currentPage = ref(1);
  const pageSize = ref(25);
  const searchQuery = ref('');
  const activeFilter = ref<DiffFilterType>('all');

  const filteredItems = computed(() => {
    let list = items.value || [];

    if (activeFilter.value === 'changed') {
      list = list.filter(item => item.diff?.has_changes);
    } else if (activeFilter.value === 'created') {
      list = list.filter(item => item.match_type === 'created');
    } else if (activeFilter.value === 'price_changed') {
      list = list.filter(item => item.diff?.changes?.regular_price !== undefined);
    } else if (activeFilter.value === 'out_of_stock') {
      list = list.filter(item => {
        const stockNew = item.diff?.changes?.stock_quantity?.new;
        return stockNew === 0 || item.current_stock === 0;
      });
    } else if (activeFilter.value === 'unchanged') {
      list = list.filter(item => !item.diff?.has_changes);
    }

    const query = searchQuery.value.trim().toLowerCase();
    if (query) {
      list = list.filter(item =>
        (item.product_name && item.product_name.toLowerCase().includes(query)) ||
        (item.excel_name && item.excel_name.toLowerCase().includes(query)) ||
        (item.excel_sku && item.excel_sku.toLowerCase().includes(query))
      );
    }

    return list;
  });

  const totalItems = computed(() => filteredItems.value.length);
  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)));

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredItems.value.slice(start, start + pageSize.value);
  });

  const startIndex = computed(() => {
    if (totalItems.value === 0) return 0;
    return (currentPage.value - 1) * pageSize.value + 1;
  });

  const endIndex = computed(() => {
    return Math.min(currentPage.value * pageSize.value, totalItems.value);
  });

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  function nextPage() {
    setPage(currentPage.value + 1);
  }

  function prevPage() {
    setPage(currentPage.value - 1);
  }

  function setPageSize(size: number) {
    pageSize.value = size;
    currentPage.value = 1;
  }

  function setFilter(filter: DiffFilterType) {
    activeFilter.value = filter;
    currentPage.value = 1;
  }

  function setSearch(query: string) {
    searchQuery.value = query;
    currentPage.value = 1;
  }

  return {
    currentPage,
    pageSize,
    searchQuery,
    activeFilter,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    filteredItems,
    paginatedItems,
    setPage,
    nextPage,
    prevPage,
    setPageSize,
    setFilter,
    setSearch,
  };
}
