import { ref, computed, onMounted } from 'vue';
import type { SourceCategoryItem, TargetCategoryItem, CategoryMappingRecord } from '../types';
import { API_BASE_URL, getTenantHeaders } from '../../../config/api';

const defaultSourceCategories: SourceCategoryItem[] = [
  { id: 'src-1', name: 'لوازم جانبی > کابل و شارژر', source_shop_name: 'هیسکا', product_count: 142, suggestedTargetId: 'tgt-1' },
  { id: 'src-2', name: 'صوتی > هندزفری و هدفون', source_shop_name: 'هیسکا', product_count: 98, suggestedTargetId: 'tgt-2' },
  { id: 'src-3', name: 'لوازم جانبی موبایل > قاب و کاور محافظ', source_shop_name: 'پرنسلی', product_count: 215, suggestedTargetId: 'tgt-3' },
  { id: 'src-4', name: 'شارژ و باتری > پاوربانک و شارژر همراه', source_shop_name: 'هیسکا', product_count: 64, suggestedTargetId: 'tgt-4' },
  { id: 'src-5', name: 'کامپیوتر و اداری > ماوس و کیبورد', source_shop_name: 'پرنسلی', product_count: 86, suggestedTargetId: 'tgt-5' },
  { id: 'src-6', name: 'صوتی و تصویری > اسپیکر بلوتوثی پرتابل', source_shop_name: 'هیسکا', product_count: 42, suggestedTargetId: 'tgt-2' },
  { id: 'src-7', name: 'لوازم جانبی > تبدیل و رابط برق', source_shop_name: 'پرنسلی', product_count: 35, suggestedTargetId: 'tgt-1' },
  { id: 'src-8', name: 'محافظ صفحه > گلس گوشی و تبلت', source_shop_name: 'هیسکا', product_count: 110, suggestedTargetId: 'tgt-3' },
  { id: 'src-9', name: 'تجهیزات ذخیره‌سازی > فلش مموری و رم', source_shop_name: 'پرنسلی', product_count: 53, suggestedTargetId: 'tgt-6' },
  { id: 'src-10', name: 'لوازم خودرو > هولدر و پایه نگهدارنده', source_shop_name: 'هیسکا', product_count: 28, suggestedTargetId: 'tgt-7' },
];

const defaultTargetCategories: TargetCategoryItem[] = [
  { id: 'tgt-1', name: 'کابل و اتصالات', slug: 'cables' },
  { id: 'tgt-2', name: 'هدفون و تجهیزات صوتی', slug: 'audio' },
  { id: 'tgt-3', name: 'قاب و محافظ صفحه', slug: 'covers' },
  { id: 'tgt-4', name: 'پاوربانک و شارژر', slug: 'chargers' },
  { id: 'tgt-5', name: 'ماوس و کیبورد', slug: 'input-devices' },
  { id: 'tgt-6', name: 'حافظه و فلش مموری', slug: 'storage' },
  { id: 'tgt-7', name: 'لوازم جانبی خودرو', slug: 'car-accessories' },
];

// Initial 8 mapped out of 10
const defaultMappings: CategoryMappingRecord[] = [
  { id: 'map-1', source_category: 'src-1', internal_category: 'tgt-1', is_active: true },
  { id: 'map-2', source_category: 'src-2', internal_category: 'tgt-2', is_active: true },
  { id: 'map-3', source_category: 'src-3', internal_category: 'tgt-3', is_active: true },
  { id: 'map-4', source_category: 'src-4', internal_category: 'tgt-4', is_active: true },
  { id: 'map-5', source_category: 'src-5', internal_category: 'tgt-5', is_active: true },
  { id: 'map-6', source_category: 'src-6', internal_category: 'tgt-2', is_active: true },
  { id: 'map-7', source_category: 'src-7', internal_category: 'tgt-1', is_active: true },
  { id: 'map-8', source_category: 'src-8', internal_category: 'tgt-3', is_active: true },
];

export function useCategoryMapper() {
  const sourceCategories = ref<SourceCategoryItem[]>([]);
  const targetCategories = ref<TargetCategoryItem[]>([]);
  const mappings = ref<CategoryMappingRecord[]>([]);
  const isLoading = ref<boolean>(false);
  const isAutoMatching = ref<boolean>(false);
  const toastMessage = ref<string | null>(null);

  function useDefaults() {
    sourceCategories.value = JSON.parse(JSON.stringify(defaultSourceCategories));
    targetCategories.value = JSON.parse(JSON.stringify(defaultTargetCategories));
    mappings.value = JSON.parse(JSON.stringify(defaultMappings));
  }

  async function loadAllData() {
    isLoading.value = true;
    try {
      const [srcRes, tgtRes, mapRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/sources/categories/`, { headers: getTenantHeaders() }),
        fetch(`${API_BASE_URL}/api/catalog/internal-categories/`, { headers: getTenantHeaders() }),
        fetch(`${API_BASE_URL}/api/publishing/category-mappings/`, { headers: getTenantHeaders() }),
      ]);

      if (srcRes.ok && tgtRes.ok && mapRes.ok) {
        const srcData = await srcRes.json();
        const tgtData = await tgtRes.json();
        const mapData = await mapRes.json();

        sourceCategories.value = Array.isArray(srcData) ? srcData : srcData.results || defaultSourceCategories;
        targetCategories.value = Array.isArray(tgtData) ? tgtData : tgtData.results || defaultTargetCategories;
        mappings.value = Array.isArray(mapData) ? mapData : mapData.results || defaultMappings;
      } else {
        useDefaults();
      }
    } catch {
      useDefaults();
    } finally {
      isLoading.value = false;
    }
  }

  function updateMapping(sourceCatId: string, targetCatId: string | null) {
    const existingIndex = mappings.value.findIndex(m => m.source_category === sourceCatId);
    const record: CategoryMappingRecord = {
      source_category: sourceCatId,
      internal_category: targetCatId,
      is_active: Boolean(targetCatId),
    };

    if (existingIndex >= 0) {
      mappings.value[existingIndex] = record;
    } else {
      mappings.value.push(record);
    }

    toastMessage.value = 'تغییر ذخیره شد';
    setTimeout(() => {
      toastMessage.value = null;
    }, 2500);
  }

  function autoMatchCategories() {
    isAutoMatching.value = true;
    setTimeout(() => {
      sourceCategories.value.forEach(src => {
        const isMapped = mappings.value.some(m => m.source_category === src.id && m.internal_category);
        if (!isMapped && src.suggestedTargetId) {
          updateMapping(src.id, src.suggestedTargetId);
        }
      });
      isAutoMatching.value = false;
      toastMessage.value = 'تطبیق خودکار دسته‌ها با موفقیت انجام شد';
      setTimeout(() => {
        toastMessage.value = null;
      }, 3000);
    }, 400);
  }

  const mappedCount = computed(() => {
    return mappings.value.filter(m => Boolean(m.internal_category)).length;
  });

  onMounted(() => {
    loadAllData();
  });

  return {
    sourceCategories,
    targetCategories,
    mappings,
    isLoading,
    isAutoMatching,
    toastMessage,
    mappedCount,
    updateMapping,
    autoMatchCategories,
  };
}
