import { ref, onMounted } from 'vue';
import type { StoreConnection, PullCatalogResult } from '../types';
import { getTenantHeaders } from '../../../config/api';
import { useLayout } from '../../../composables/useLayout';

export function useSyncEngine() {
  const { setStoreName } = useLayout();
  const isTestingConnection = ref<boolean>(false);
  const testSuccessAlert = ref<string | null>(null);
  const isEditingWooModal = ref<boolean>(false);
  const isEditingDigikalaModal = ref<boolean>(false);
  const isPullingCatalog = ref<boolean>(false);
  const pullResult = ref<PullCatalogResult | null>(null);
  const pullError = ref<string | null>(null);

  const wooConnection = ref<StoreConnection>({
    id: 'store-woo',
    platform: 'woocommerce',
    title: 'فروشگاه ووکامرس',
    status: 'disconnected',
    details: 'آماده اتصال',
    siteUrl: '',
    consumerKey: '',
    consumerSecret: '',
  });

  const digikalaConnection = ref<StoreConnection>({
    id: 'store-digikala',
    platform: 'digikala',
    title: 'پنل فروشندگان دیجی‌کالا',
    status: 'disconnected',
    details: 'آماده اتصال',
    siteUrl: '',
    consumerKey: '',
    consumerSecret: '',
    apiKey: '',
  });

  async function loadActiveConfig() {
    try {
      const res = await fetch('/api/publishing/configs/active/', {
        headers: getTenantHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        const conf = data.result;
        if (conf) {
          if (conf.store_name) {
            wooConnection.value.title = conf.store_name;
            wooConnection.value.storeName = conf.store_name;
            setStoreName(conf.store_name);
          }
          if (conf.base_url) {
            wooConnection.value.siteUrl = conf.base_url;
            wooConnection.value.details = `${conf.base_url} (ذخیره‌شده)`;
            wooConnection.value.status = conf.enabled ? 'connected' : 'disconnected';
          }
        }
      }
    } catch {
      // Offline fallback
    }
  }

  async function testConnection() {
    isTestingConnection.value = true;
    testSuccessAlert.value = null;

    try {
      const res = await fetch('/api/publishing/configs/test-connection/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getTenantHeaders() },
        credentials: 'include',
        body: JSON.stringify({
          base_url: wooConnection.value.siteUrl,
          consumer_key: wooConnection.value.consumerKey,
          consumer_secret: wooConnection.value.consumerSecret,
        }),
      });
      const data = await res.json();
      const isOk = res.ok && (data.result?.status === 'ok' || data.status === 'ok');
      if (isOk) {
        wooConnection.value.status = 'connected';
        testSuccessAlert.value = '✓ ارتباط با فروشگاه ووکامرس برقرار است و کلیدها معتبرند.';
      } else {
        wooConnection.value.status = 'disconnected';
        testSuccessAlert.value = `خطا در ارتباط با ووکامرس: ${data.message || 'عدم دسترسی به آدرس یا کلیدها'}`;
      }
    } catch (err: any) {
      testSuccessAlert.value = `خطا در برقراری ارتباط: ${err.message || 'سرور پاسخ نمی‌دهد'}`;
    } finally {
      isTestingConnection.value = false;
      setTimeout(() => {
        testSuccessAlert.value = null;
      }, 5000);
    }
  }

  async function pullStoreCatalog() {
    isPullingCatalog.value = true;
    pullError.value = null;
    pullResult.value = null;

    try {
      const res = await fetch('/api/publishing/configs/pull-catalog/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getTenantHeaders() },
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok && data.result) {
        pullResult.value = {
          categoriesCount: data.result.categories_count || 0,
          productsImported: data.result.products_imported || 0,
          productsUpdated: data.result.products_updated || 0,
          totalProducts: data.result.total_products || 0,
        };
        testSuccessAlert.value = `✓ کاتالوگ با موفقیت همگام شد: ${pullResult.value.totalProducts.toLocaleString('fa-IR')} کالا و ${pullResult.value.categoriesCount.toLocaleString('fa-IR')} دسته‌بندی از ووکامرس دریافت شد.`;
      } else {
        testSuccessAlert.value = data.message || 'خطا در دریافت کاتالوگ از ووکامرس';
      }
    } catch (err: any) {
      testSuccessAlert.value = `خطا در ارتباط: ${err.message}`;
    } finally {
      isPullingCatalog.value = false;
    }
  }

  async function saveWooKeys(url: string, key: string, secret: string, name?: string) {
    const finalStoreName = (name || '').trim() || wooConnection.value.storeName || 'فروشگاه من';
    try {
      const res = await fetch('/api/publishing/configs/active/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getTenantHeaders() },
        credentials: 'include',
        body: JSON.stringify({
          base_url: url,
          consumer_key: key,
          consumer_secret: secret,
          store_name: finalStoreName,
        }),
      });

      if (res.ok) {
        wooConnection.value.siteUrl = url;
        wooConnection.value.consumerKey = key;
        wooConnection.value.consumerSecret = secret;
        wooConnection.value.title = finalStoreName;
        wooConnection.value.storeName = finalStoreName;
        wooConnection.value.status = 'connected';
        wooConnection.value.details = `${url} (متصل)`;
        setStoreName(finalStoreName);
        testSuccessAlert.value = 'اطلاعات اتصال ووکامرس با موفقیت در سیستم ذخیره شد.';
      } else {
        testSuccessAlert.value = 'خطا در ذخیره اطلاعات ووکامرس در سرور';
      }
    } catch {
      wooConnection.value.siteUrl = url;
      wooConnection.value.consumerKey = key;
      wooConnection.value.consumerSecret = secret;
      wooConnection.value.title = finalStoreName;
      wooConnection.value.storeName = finalStoreName;
      wooConnection.value.status = 'connected';
      wooConnection.value.details = `${url} (لوکال)`;
      setStoreName(finalStoreName);
      testSuccessAlert.value = 'اطلاعات اتصال ثبت شد.';
    } finally {
      isEditingWooModal.value = false;
      setTimeout(() => {
        testSuccessAlert.value = null;
      }, 4000);
    }
  }

  function saveDigikalaKey(apiKey: string) {
    digikalaConnection.value.apiKey = apiKey;
    digikalaConnection.value.status = apiKey ? 'connected' : 'disconnected';
    digikalaConnection.value.details = apiKey ? 'متصل به پنل سلر' : 'آماده اتصال';
    isEditingDigikalaModal.value = false;
    testSuccessAlert.value = 'کلید پنل فروشندگان دیجی‌کالا با موفقیت ذخیره شد';
    setTimeout(() => {
      testSuccessAlert.value = null;
    }, 3000);
  }

  onMounted(() => {
    loadActiveConfig();
  });

  return {
    wooConnection,
    digikalaConnection,
    isTestingConnection,
    testSuccessAlert,
    isEditingWooModal,
    isEditingDigikalaModal,
    isPullingCatalog,
    pullResult,
    pullError,
    testConnection,
    pullStoreCatalog,
    saveWooKeys,
    saveDigikalaKey,
  };
}
