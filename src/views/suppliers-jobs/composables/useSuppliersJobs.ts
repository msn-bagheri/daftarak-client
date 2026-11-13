import { ref } from 'vue';
import type { SupplierItem, ActivityLogItem, SupplierCategory } from '../types';

export function useSuppliersJobs() {
  const toastMessage = ref<string | null>(null);
  const isAddSupplierModalOpen = ref<boolean>(false);
  const activeSupplierForCategories = ref<SupplierItem | null>(null);

  const supplierCategoriesMap = ref<Record<string, SupplierCategory[]>>({
    'sup-hiska': [
      { id: 'cat-h1', name: 'لوازم جانبی موبایل > کابل شارژ', productCount: 420, isSelected: true },
      { id: 'cat-h2', name: 'لوازم جانبی موبایل > شارژر دیواری', productCount: 280, isSelected: true },
      { id: 'cat-h3', name: 'صوتی > هدفون و هندزفری بلوتوث', productCount: 350, isSelected: true },
      { id: 'cat-h4', name: 'پاوربانک و باتری', productCount: 150, isSelected: false },
    ],
    'sup-princely': [
      { id: 'cat-p1', name: 'آرایشی و بهداشتی > سشوار حرفه‌ای', productCount: 310, isSelected: true },
      { id: 'cat-p2', name: 'آرایشی و بهداشتی > ماشین اصلاح مو', productCount: 290, isSelected: true },
      { id: 'cat-p3', name: 'زیبایی > اتو مو و حالت‌دهنده', productCount: 250, isSelected: false },
    ],
  });

  const suppliers = ref<SupplierItem[]>([
    {
      id: 'sup-hiska',
      name: 'هیسکا (Hiska)',
      status: 'در حال بررسی دوره‌ای (هر ۲ ساعت یکبار)',
      productCount: 1200,
      lastChecked: '۱۵ دقیقه پیش',
      isUpdating: false,
    },
    {
      id: 'sup-princely',
      name: 'پرنسلی (Princely)',
      status: 'در حال بررسی دوره‌ای (هر ۲ ساعت یکبار)',
      productCount: 850,
      lastChecked: '۳۵ دقیقه پیش',
      isUpdating: false,
    },
  ]);

  const activityLogs = ref<ActivityLogItem[]>([
    {
      id: 'log-1',
      timestamp: 'امروز - ۱۲:۳۰',
      message: '۴۲ کالا با موفقیت بروز شدند.',
      level: 'success',
    },
    {
      id: 'log-2',
      timestamp: 'امروز - ۱۰:۱۵',
      message: 'لیست قیمت هیسکا بدون تغییر بود.',
      level: 'info',
    },
    {
      id: 'log-3',
      timestamp: 'دیروز - ۱۸:۰۰',
      message: 'هشدار - ارتباط با هاست ووکامرس شما ۳۰ ثانیه قطع شد (تلاش مجدد انجام شد).',
      level: 'warning',
    },
  ]);

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
    openManageCategories,
    saveSupplierCategories,
  };
}
