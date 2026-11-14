import { ref, onMounted } from 'vue';
import type {
  WooCommerceConfig,
  CategoryMapping,
  WooProductMapping,
  ConnectionReport,
  SourceCategoryOption,
  InternalCategoryOption,
  ProductOption,
} from '../types';
import { API_BASE_URL, getTenantHeaders } from '../../../config/api';
import { useLayout } from '../../../composables/useLayout';

export function usePublishing() {
  const { setStoreName } = useLayout();
  const configs = ref<WooCommerceConfig[]>([]);
  const categoryMappings = ref<CategoryMapping[]>([]);
  const productMappings = ref<WooProductMapping[]>([]);
  const sourceCategories = ref<SourceCategoryOption[]>([]);
  const internalCategories = ref<InternalCategoryOption[]>([]);
  const catalogProducts = ref<ProductOption[]>([]);

  const connectionReports = ref<Record<string, ConnectionReport>>({});
  const isTestingConnection = ref<Record<string, boolean>>({});
  const isPublishing = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const activeSubTab = ref<'configs' | 'categories' | 'mappings'>('configs');
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  function setFeedback(msg: string, isError = false) {
    if (isError) {
      errorMessage.value = msg;
      successMessage.value = null;
    } else {
      successMessage.value = msg;
      errorMessage.value = null;
    }
    setTimeout(() => {
      errorMessage.value = null;
      successMessage.value = null;
    }, 4500);
  }

  async function fetchConfigs() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/configs/`, {
        headers: getTenantHeaders(),
      });
      if (!res.ok) throw new Error('خطا در دریافت تنظیمات ووکامرس');
      const data = await res.json();
      configs.value = data.result || data.results || data || [];
    } catch (err: any) {
      console.warn('Could not fetch configs:', err.message);
    }
  }

  async function saveConfig(cfg: Partial<WooCommerceConfig>) {
    isLoading.value = true;
    try {
      const isUpdate = Boolean(cfg.id);
      const url = isUpdate 
        ? `${API_BASE_URL}/api/publishing/configs/${cfg.id}/` 
        : `${API_BASE_URL}/api/publishing/configs/`;
      const res = await fetch(url, {
        method: isUpdate ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json', ...getTenantHeaders() },
        body: JSON.stringify(cfg),
      });
      if (!res.ok) throw new Error('خطا در ذخیره اتصال فروشگاه ووکامرس');
      if (cfg.store_name) {
        setStoreName(cfg.store_name);
      }
      await fetchConfigs();
      setFeedback('فروشگاه ووکامرس با موفقیت ذخیره شد.');
    } catch (err: any) {
      setFeedback(err.message, true);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteConfig(id: string) {
    isLoading.value = true;
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/configs/${id}/`, {
        method: 'DELETE',
        headers: getTenantHeaders(),
      });
      if (!res.ok) throw new Error('خطا در حذف فروشگاه');
      configs.value = configs.value.filter(c => c.id !== id);
      setFeedback('پیکربندی فروشگاه با موفقیت حذف شد.');
    } catch (err: any) {
      setFeedback(err.message, true);
    } finally {
      isLoading.value = false;
    }
  }

  async function checkConnection(id: string) {
    isTestingConnection.value[id] = true;
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/configs/${id}/check-connection/`, {
        headers: getTenantHeaders(),
      });
      const data = await res.json();
      connectionReports.value[id] = data;
      if (res.ok && (data.status === 'ok' || data.success !== false)) {
        setFeedback('ارتباط با وب‌سرویس ووکامرس با موفقیت تأیید شد.');
      } else {
        setFeedback(`خطا در ارتباط با ووکامرس: ${data.error || data.message || 'پاسخ نامعتبر'}`, true);
      }
    } catch (err: any) {
      connectionReports.value[id] = { error: err.message };
      setFeedback(`خطا در اتصال: ${err.message}`, true);
    } finally {
      isTestingConnection.value[id] = false;
    }
  }

  async function fetchCategoryMappings() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/category-mappings/`, {
        headers: getTenantHeaders(),
      });
      if (!res.ok) throw new Error('خطا در دریافت نگاشت دسته‌بندی‌ها');
      const data = await res.json();
      categoryMappings.value = data.result || data.results || data || [];
    } catch (err: any) {
      console.warn('Could not fetch category mappings:', err.message);
    }
  }

  async function saveCategoryMapping(mapping: Partial<CategoryMapping>) {
    isLoading.value = true;
    try {
      const isUpdate = Boolean(mapping.id);
      const url = isUpdate 
        ? `${API_BASE_URL}/api/publishing/category-mappings/${mapping.id}/` 
        : `${API_BASE_URL}/api/publishing/category-mappings/`;
      const res = await fetch(url, {
        method: isUpdate ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json', ...getTenantHeaders() },
        body: JSON.stringify(mapping),
      });
      if (!res.ok) throw new Error('خطا در ذخیره نگاشت دسته‌بندی');
      await fetchCategoryMappings();
      setFeedback('نگاشت دسته‌بندی با موفقیت ذخیره شد.');
    } catch (err: any) {
      setFeedback(err.message, true);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteCategoryMapping(id: string) {
    isLoading.value = true;
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/category-mappings/${id}/`, {
        method: 'DELETE',
        headers: getTenantHeaders(),
      });
      if (!res.ok) throw new Error('خطا در حذف نگاشت');
      categoryMappings.value = categoryMappings.value.filter(m => m.id !== id);
      setFeedback('نگاشت دسته‌بندی حذف شد.');
    } catch (err: any) {
      setFeedback(err.message, true);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchProductMappings() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/product-mappings/`, {
        headers: getTenantHeaders(),
      });
      if (!res.ok) throw new Error('خطا در دریافت کالاهای منتشرشده');
      const data = await res.json();
      productMappings.value = data.result || data.results || data || [];
    } catch (err: any) {
      console.warn('Could not fetch product mappings:', err.message);
    }
  }

  async function publishProduct(productId: string, configId: string) {
    isPublishing.value = true;
    try {
      const res = await fetch(`${API_BASE_URL}/api/publishing/product-mappings/publish-product/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getTenantHeaders() },
        body: JSON.stringify({ product_id: productId, config_id: configId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'خطا در انتشار کالا به ووکامرس');
      }
      setFeedback('محصول با موفقیت در ووکامرس منتشر شد.');
      await fetchProductMappings();
    } catch (err: any) {
      setFeedback(err.message, true);
      throw err;
    } finally {
      isPublishing.value = false;
    }
  }

  async function fetchLookups() {
    try {
      const [sourcesRes, internalsRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/sources/categories/`, { headers: getTenantHeaders() }),
        fetch(`${API_BASE_URL}/api/catalog/internal-categories/`, { headers: getTenantHeaders() }),
        fetch(`${API_BASE_URL}/api/catalog/products/`, { headers: getTenantHeaders() }),
      ]);
      if (sourcesRes.ok) {
        const data = await sourcesRes.json();
        sourceCategories.value = data.result || data.results || data || [];
      }
      if (internalsRes.ok) {
        const data = await internalsRes.json();
        internalCategories.value = data.result || data.results || data || [];
      }
      if (productsRes.ok) {
        const data = await productsRes.json();
        catalogProducts.value = data.result || data.results || data || [];
      }
    } catch (err) {
      console.warn('Could not fetch lookups:', err);
    }
  }

  async function loadAll() {
    isLoading.value = true;
    await Promise.all([
      fetchConfigs(),
      fetchCategoryMappings(),
      fetchProductMappings(),
      fetchLookups(),
    ]);
    isLoading.value = false;
  }

  onMounted(() => {
    loadAll();
  });

  return {
    configs,
    categoryMappings,
    productMappings,
    sourceCategories,
    internalCategories,
    catalogProducts,
    connectionReports,
    isTestingConnection,
    isPublishing,
    isLoading,
    activeSubTab,
    errorMessage,
    successMessage,
    saveConfig,
    deleteConfig,
    checkConnection,
    saveCategoryMapping,
    deleteCategoryMapping,
    publishProduct,
    loadAll,
  };
}
