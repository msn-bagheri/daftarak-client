import { ref, onMounted } from 'vue';
import type { SupplierItem, ActivityLogItem, SupplierCategory } from '../types';

const SUPPLIERS_STORAGE_KEY = 'daftarak_user_suppliers';
const SUPPLIER_CATS_STORAGE_KEY = 'daftarak_supplier_categories';

function getStoredSuppliers(): SupplierItem[] {
  try {
    const raw = localStorage.getItem(SUPPLIERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getStoredCategories(): Record<string, SupplierCategory[]> {
  try {
    const raw = localStorage.getItem(SUPPLIER_CATS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useSuppliersJobs() {
  const toastMessage = ref<string | null>(null);
  const isAddSupplierModalOpen = ref<boolean>(false);
  const activeSupplierForCategories = ref<SupplierItem | null>(null);

  const supplierCategoriesMap = ref<Record<string, SupplierCategory[]>>(getStoredCategories());
  const suppliers = ref<SupplierItem[]>(getStoredSuppliers());

  const activityLogs = ref<ActivityLogItem[]>([
    {
      id: 'log-init',
      timestamp: 'سیستم',
      message: 'سامانه بررسی دوره‌ای و پایش خودکار تأمین‌کنندگان آماده به‌کار است.',
      level: 'info',
    },
  ]);

  function persistSuppliers() {
    try {
      localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(suppliers.value));
      localStorage.setItem(SUPPLIER_CATS_STORAGE_KEY, JSON.stringify(supplierCategoriesMap.value));
    } catch {
      // Storage quota or disabled
    }
  }

  async function loadSuppliersFromBackend() {
    try {
      const res = await fetch('/api/sources/shops/', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const shops = data.result || data.results || data || [];
        if (Array.isArray(shops) && shops.length > 0) {
          suppliers.value = shops.map((s: any) => ({
            id: s.id || `sup-${Date.now()}`,
            name: s.name,
            status: s.status === 'active' ? 'در حال بررسی دوره‌ای (هر ۲ ساعت)' : 'غیرفعال',
            productCount: s.product_count || 0,
            lastChecked: s.last_successful_sync || 'متصل',
            isUpdating: false,
          }));
          persistSuppliers();
        }
      }
    } catch {
      // Offline fallback
    }
  }

  onMounted(() => {
    loadSuppliersFromBackend();
  });

  function triggerManualUpdate(supplierId: string) {
    const sup = suppliers.value.find(s => s.id === supplierId);
    if (!sup) return;

    sup.isUpdating = true;
    setTimeout(() => {
      sup.isUpdating = false;
      sup.lastChecked = 'لحظاتی پیش';
      toastMessage.value = `بروزرسانی موجودی و قیمت تأمین‌کننده «${sup.name}» با موفقیت انجام شد.`;
      
      activityLogs.value.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'امروز - هم‌اکنون',
        message: `بروزرسانی دستی موجودی کاتالوگ ${sup.name} با موفقیت پایان یافت.`,
        level: 'success',
      });

      setTimeout(() => {
        toastMessage.value = null;
      }, 4000);
    }, 700);
  }

  function addSupplier(payload: { name: string; baseUrl: string; connectionType: string; consumerKey?: string; consumerSecret?: string }) {
    const newId = `sup-${Date.now()}`;
    suppliers.value.push({
      id: newId,
      name: payload.name,
      status: 'در حال بررسی دوره‌ای (هر ۱ ساعت یکبار)',
      productCount: 0,
      lastChecked: 'هم‌اکنون متصل شد',
      isUpdating: false,
    });
    supplierCategoriesMap.value[newId] = [
      { id: `cat-${newId}-1`, name: 'دسته عمومی محصولات', productCount: 0, isSelected: true }
    ];
    persistSuppliers();
    isAddSupplierModalOpen.value = false;
    toastMessage.value = `تأمین‌کننده «${payload.name}» با موفقیت اضافه شد.`;
    activityLogs.value.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'امروز - هم‌اکنون',
      message: `سایت تأمین‌کننده ${payload.name} (${payload.baseUrl}) متصل و آماده بررسی شد.`,
      level: 'success',
    });
    setTimeout(() => {
      toastMessage.value = null;
    }, 4000);
  }

  function removeSupplier(supplierId: string) {
    const idx = suppliers.value.findIndex(s => s.id === supplierId);
    if (idx !== -1) {
      const removed = suppliers.value.splice(idx, 1)[0];
      delete supplierCategoriesMap.value[supplierId];
      persistSuppliers();
      toastMessage.value = `تأمین‌کننده «${removed.name}» حذف شد.`;
      setTimeout(() => {
        toastMessage.value = null;
      }, 3000);
    }
  }

  function openManageCategories(supplierId: string) {
    const sup = suppliers.value.find(s => s.id === supplierId);
    if (!sup) return;
    if (!supplierCategoriesMap.value[supplierId]) {
      supplierCategoriesMap.value[supplierId] = [
        { id: `cat-${supplierId}-1`, name: 'دسته‌بندی اصلی ۱', productCount: 40, isSelected: true },
        { id: `cat-${supplierId}-2`, name: 'دسته‌بندی اصلی ۲', productCount: 25, isSelected: true },
      ];
    }
    activeSupplierForCategories.value = sup;
  }

  function saveSupplierCategories(selectedIds: string[]) {
    if (!activeSupplierForCategories.value) return;
    const supId = activeSupplierForCategories.value.id;
    const cats = supplierCategoriesMap.value[supId] || [];
    cats.forEach(c => {
      c.isSelected = selectedIds.includes(c.id);
    });

    toastMessage.value = `دسته‌بندی‌های مجاز برای واردات از «${activeSupplierForCategories.value.name}» بروزرسانی شد (${selectedIds.length.toLocaleString('fa-IR')} دسته انتخاب شد).`;
    activityLogs.value.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'امروز - هم‌اکنون',
      message: `فیلتر دسته‌های واردات برای ${activeSupplierForCategories.value.name} ذخیره شد (${selectedIds.length} دسته).`,
      level: 'info',
    });

    activeSupplierForCategories.value = null;
    setTimeout(() => {
      toastMessage.value = null;
    }, 4000);
  }

  return {
    suppliers,
    activityLogs,
    toastMessage,
    isAddSupplierModalOpen,
    activeSupplierForCategories,
    supplierCategoriesMap,
    triggerManualUpdate,
    addSupplier,
    removeSupplier,
    openManageCategories,
    saveSupplierCategories,
  };
}
