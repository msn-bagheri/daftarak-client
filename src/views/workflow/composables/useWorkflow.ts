import { ref } from 'vue';
import type { DashboardMetrics, LinearStep, RecentUpdateItem, OnboardingChecklistItem } from '../types';

export function useWorkflow() {
  const isRefreshing = ref<boolean>(false);

  const metrics = ref<DashboardMetrics>({
    syncedProducts: 3450,
    changes24h: 128,
    errorsCount: 3,
  });

  const linearSteps = ref<LinearStep[]>([
    {
      id: 1,
      title: 'دریافت از عمده‌فروش',
      statusInfo: 'آخرین بار: ۵ دقیقه پیش',
      isComplete: true,
      targetTab: 'suppliers',
    },
    {
      id: 2,
      title: 'تطبیق کالا و دسته‌بندی',
      statusInfo: '۱۰۰٪ انجام شده',
      isComplete: true,
      targetTab: 'category-mapper',
    },
    {
      id: 3,
      title: 'محاسبه سود و رندسازی',
      statusInfo: 'فرمول فعال: +۱۸٪',
      isComplete: true,
      targetTab: 'transformations',
    },
    {
      id: 4,
      title: 'بروزرسانی سایت شما',
      statusInfo: 'وضعیت: متصل و پایدار',
      isComplete: true,
      targetTab: 'sync-engine',
    },
  ]);

  const recentUpdates = ref<RecentUpdateItem[]>([
    {
      id: 'up-1',
      productName: 'شارژر دیواری هیسکا H-20',
      sku: 'HSK-H20-W',
      oldPrice: 190000,
      newPrice: 220000,
      timeAgo: 'لحظاتی پیش',
      channelStatus: 'ثبت شد در ووکامرس',
    },
    {
      id: 'up-2',
      productName: 'هدفون بلوتوثی هیسکا مدل B12',
      sku: 'HSK-B12-BT',
      oldPrice: 450000,
      newPrice: 540000,
      timeAgo: '۳ دقیقه پیش',
      channelStatus: 'ثبت شد در ووکامرس',
    },
    {
      id: 'up-3',
      productName: 'کابل تایپ سی به لایتنینگ بیسوس',
      sku: 'BS-CL-100',
      oldPrice: 120000,
      newPrice: 135000,
      timeAgo: '۱۲ دقیقه پیش',
      channelStatus: 'ثبت شد در ووکامرس',
    },
    {
      id: 'up-4',
      productName: 'پاوربانک ۲۰۰۰۰ میلی‌آمپر شیائومی',
      sku: 'MI-PB-20K',
      oldPrice: 1100000,
      newPrice: 1250000,
      timeAgo: '۳۵ دقیقه پیش',
      channelStatus: 'ثبت شد در ووکامرس',
    },
  ]);

  const onboardingChecklist = ref<OnboardingChecklistItem[]>([
    {
      id: 'step-1',
      title: 'اتصال آدرس و کلیدهای ووکامرس',
      isCompleted: true,
      targetTab: 'sync-engine',
    },
    {
      id: 'step-2',
      title: 'تنظیم درصد سود و قانون رند کردن قیمت‌ها',
      isCompleted: true,
      targetTab: 'transformations',
    },
    {
      id: 'step-3',
      title: 'تطبیق دسته‌بندی‌های تأمین‌کننده با سایت',
      isCompleted: true,
      targetTab: 'category-mapper',
    },
    {
      id: 'step-4',
      title: 'بررسی اولین بارگذاری یا دریافت کاتالوگ کالاها',
      isCompleted: false,
      targetTab: 'catalog',
    },
  ]);

  function refreshDashboard() {
    isRefreshing.value = true;
    setTimeout(() => {
      isRefreshing.value = false;
    }, 600);
  }

  return {
    isRefreshing,
    metrics,
    linearSteps,
    recentUpdates,
    onboardingChecklist,
    refreshDashboard,
  };
}
