import { ref, computed } from 'vue';
import type { ProductItem, CatalogFilterTab } from '../types';

const initialProducts: ProductItem[] = [
  {
    id: 'p-1',
    name: 'هدفون بلوتوثی هیسکا مدل B12',
    sku: 'HSK-B12',
    costPrice: 340000,
    salePrice: 408000,
    profit: 68000,
    stockQuantity: 15,
    isAvailable: true,
    hasPriceChange: false,
    hasCategory: true,
    isActiveOnSite: true,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
  },
  {
    id: 'p-2',
    name: 'شارژر دیواری فست هیسکا H-20',
    sku: 'HSK-H20',
    costPrice: 190000,
    salePrice: 228000,
    profit: 38000,
    stockQuantity: 42,
    isAvailable: true,
    hasPriceChange: true,
    hasCategory: true,
    isActiveOnSite: true,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=100&q=80',
  },
  {
    id: 'p-3',
    name: 'ماوس ارگونومیک بی‌سیم لاجیتک MX Master 3S',
    sku: 'LOG-MX3S',
    costPrice: 5200000,
    salePrice: 6240000,
    profit: 1040000,
    stockQuantity: 0,
    isAvailable: false,
    hasPriceChange: false,
    hasCategory: true,
    isActiveOnSite: false,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&q=80',
  },
  {
    id: 'p-4',
    name: 'کابل تایپ سی به لایتنینگ بیسوس ۱۰۰ وات',
    sku: 'BS-CL100',
    costPrice: 120000,
    salePrice: 144000,
    profit: 24000,
    stockQuantity: 85,
    isAvailable: true,
    hasPriceChange: true,
    hasCategory: false,
    isActiveOnSite: true,
    imageUrl: 'https://images.unsplash.com/photo-1609592426868-80e227526fa1?w=100&q=80',
  },
  {
    id: 'p-5',
    name: 'پاوربانک ۲۰۰۰۰ میلی‌آمپر شیائومی Redmi',
    sku: 'MI-PB-20K',
    costPrice: 950000,
    salePrice: 1140000,
    profit: 190000,
    stockQuantity: 28,
    isAvailable: true,
    hasPriceChange: false,
    hasCategory: true,
    isActiveOnSite: true,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=100&q=80',
  },
  {
    id: 'p-6',
    name: 'اسپیکر قابل حمل جی‌بی‌ال مدل Charge 5',
    sku: 'JBL-CHG5',
    costPrice: 6800000,
    salePrice: 8160000,
    profit: 1360000,
    stockQuantity: 0,
    isAvailable: false,
    hasPriceChange: true,
    hasCategory: true,
    isActiveOnSite: false,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=100&q=80',
  },
];

export function useCatalog() {
  const products = ref<ProductItem[]>(initialProducts);
  const searchQuery = ref<string>('');
  const activeFilter = ref<CatalogFilterTab>('all');

  function toggleProductActive(productId: string) {
    const item = products.value.find(p => p.id === productId);
    if (item) {
      item.isActiveOnSite = !item.isActiveOnSite;
    }
  }

  const filteredProducts = computed(() => {
    let list = products.value;

    // Filter pill logic
    if (activeFilter.value === 'price-changed') {
      list = list.filter(p => p.hasPriceChange);
    } else if (activeFilter.value === 'out-of-stock') {
      list = list.filter(p => !p.isAvailable);
    } else if (activeFilter.value === 'uncategorized') {
      list = list.filter(p => !p.hasCategory);
    }

    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q)
      );
    }

    return list;
  });

  return {
    products,
    searchQuery,
    activeFilter,
    filteredProducts,
    toggleProductActive,
  };
}
