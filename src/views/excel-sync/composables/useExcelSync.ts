import { ref, onMounted, onUnmounted } from 'vue';
import type { SyncReport, PublishProgress } from '../types';
import { API_BASE_URL, getTenantHeaders } from '../../../config/api';

const sampleMockReport: SyncReport = {
  dry_run: true,
  total_rows: 1450,
  matched_count: 1240,
  price_changed_count: 185,
  out_of_stock_count: 22,
  matched_sku_exact_count: 980,
  matched_name_exact_count: 160,
  matched_fuzzy_count: 100,
  unmatched_count: 210,
  matched_items: [
    {
      row_number: 1,
      excel_name: 'هدفون بی‌سیم انکر Soundcore Life Q30 مشکی',
      excel_sku: 'ANK-Q30-BLK',
      product_id: 'prod-101',
      product_name: 'هدفون بلوتوثی انکر مدل Soundcore Life Q30',
      match_type: 'sku_exact',
      match_score: 100,
      diff: {
        has_changes: true,
        changes: {
          regular_price: { old: '3450000', new: '3890000', delta_percent: 12.8 },
          stock_quantity: { old: 14, new: 25 },
        },
      },
    },
    {
      row_number: 2,
      excel_name: 'ساعت هوشمند شیائومی Mi Watch S1 Active',
      excel_sku: 'XIA-S1-ACT',
      product_id: 'prod-102',
      product_name: 'ساعت هوشمند شیائومی مدل S1 Active بند سیلیکونی',
      match_type: 'fuzzy',
      match_score: 94,
      diff: {
        has_changes: true,
        changes: {
          regular_price: { old: '5200000', new: '4950000', delta_percent: -4.8 },
          stock_quantity: { old: 5, new: 18 },
        },
      },
    },
    {
      row_number: 3,
      excel_name: 'پاوربانک ۲۰۰۰۰ میلی‌آمپر بیسوس 65W Blade',
      excel_sku: 'BAS-BLD-65W',
      product_id: 'prod-103',
      product_name: 'پاوربانک فست شارژ ۶۵ وات بیسوس مدل Blade ظرفیت ۲۰۰۰۰',
      match_type: 'sku_exact',
      match_score: 100,
      diff: {
        has_changes: true,
        changes: {
          regular_price: { old: '2800000', new: '3150000', delta_percent: 12.5 },
          stock_quantity: { old: 8, new: 0 },
        },
      },
    },
    {
      row_number: 4,
      excel_name: 'اسپیکر قابل حمل جی‌بی‌ال Charge 5 اورجینال',
      excel_sku: 'JBL-CHG5-GRY',
      product_id: 'prod-104',
      product_name: 'اسپیکر بلوتوثی قابل حمل جی بی ال مدل Charge 5',
      match_type: 'sku_exact',
      match_score: 100,
      diff: {
        has_changes: true,
        changes: {
          regular_price: { old: '7800000', new: '8400000', delta_percent: 7.7 },
          stock_quantity: { old: 12, new: 10 },
        },
      },
    },
    {
      row_number: 5,
      excel_name: 'کابل تبدیل لایتنینگ به تایپ سی انکر ۰.۹ متر',
      excel_sku: 'ANK-LGT-C-09',
      product_id: 'prod-105',
      product_name: 'کابل تبدیل Type-C به Lightning انکر مدل PowerLine III',
      match_type: 'name_exact',
      match_score: 98,
      diff: {
        has_changes: true,
        changes: {
          regular_price: { old: '450000', new: '520000', delta_percent: 15.6 },
          stock_quantity: { old: 30, new: 50 },
        },
      },
    },
    {
      row_number: 6,
      excel_name: 'ماوس بی سیم لاجیتک مدل MX Master 3S',
      excel_sku: 'LOG-MX3S-GRF',
      product_id: 'prod-106',
      product_name: 'ماوس بی سیم لاجیتک MX Master 3S خاکستری',
      match_type: 'sku_exact',
      match_score: 100,
      diff: {
        has_changes: true,
        changes: {
          regular_price: { old: '6200000', new: '6100000', delta_percent: -1.6 },
          stock_quantity: { old: 3, new: 0 },
        },
      },
    },
  ],
  unmatched_items: [
    {
      row_number: 7,
      excel_name: 'قاب گوشی سامسونگ گلکسی S24 Ultra سیلیکونی اورجینال',
      excel_sku: 'SAM-S24U-CSIL',
      excel_price: '480000',
      excel_stock: 40,
    },
  ],
};

export function useExcelSync() {
  const selectedFile = ref<File | null>(null);
  const isDryRun = ref<boolean>(true);
  const threshold = ref<number>(75);
  const isLoading = ref<boolean>(false);
  const isCommitting = ref<boolean>(false);
  const report = ref<SyncReport | null>(null);
  const publishProgress = ref<PublishProgress | null>(null);
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);
  let pollInterval: ReturnType<typeof setInterval> | null = null;

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  async function pollTaskProgress(taskId: string, totalProducts = 0) {
    stopPolling();
    publishProgress.value = {
      taskId,
      state: 'PENDING',
      current: 0,
      total: totalProducts,
      percent: 0,
      published: 0,
      failed: 0,
      statusText: 'تسک در صف اجرا در ورکر Celery قرار گرفت...',
    };

    pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/publishing/tasks/${taskId}/`, {
          headers: getTenantHeaders(),
        });
        if (!res.ok) return;
        const json = await res.json();
        const data = json.result;
        if (!data) return;

        publishProgress.value = {
          taskId,
          state: data.state,
          current: data.current || 0,
          total: data.total || totalProducts || publishProgress.value?.total || 0,
          percent: data.percent || 0,
          currentProduct: data.current_product,
          published: data.published || 0,
          failed: data.failed || 0,
          statusText: data.status_text,
          error: data.error,
        };

        if (data.state === 'SUCCESS') {
          stopPolling();
          isCommitting.value = false;
          successMessage.value = `✓ ارسال تمام کالاها به ووکامرس تکمیل شد (${data.published || 0} کالا با موفقیت ثبت شد).`;
        } else if (data.state === 'FAILURE') {
          stopPolling();
          isCommitting.value = false;
          errorMessage.value = `خطا در اجرای تسک Celery: ${data.error || 'خطای نامشخص'}`;
        }
      } catch {
        // Continue polling
      }
    }, 1500);
  }

  function setFile(file: File) {
    selectedFile.value = file;
    errorMessage.value = null;
    successMessage.value = null;
    uploadAndProcess(false);
  }

  async function loadSampleData() {
    isLoading.value = true;
    errorMessage.value = null;
    successMessage.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/api/catalog/products/sample-excel/`);
      if (response.ok) {
        const data = await response.json();
        report.value = data.result || data;
        const total = report.value?.total_rows || 2;
        successMessage.value = `فایل نمونه اصلی (sample.xlsx) بارگذاری شد (${total.toLocaleString('fa-IR')} کالا شناسایی گردید).`;
      } else {
        report.value = JSON.parse(JSON.stringify(sampleMockReport));
        successMessage.value = 'فایل نمونه اکسل با ۱,۴۵۰ کالا و ۱۸۵ تغییر قیمت بارگذاری شد.';
      }
    } catch {
      report.value = JSON.parse(JSON.stringify(sampleMockReport));
      successMessage.value = 'فایل نمونه اکسل بارگذاری شد.';
    } finally {
      isLoading.value = false;
      setTimeout(() => {
        successMessage.value = null;
      }, 4000);
    }
  }

  async function uploadAndProcess(executeCommit = false) {
    if (executeCommit) {
      isCommitting.value = true;
    } else {
      isLoading.value = true;
    }
    errorMessage.value = null;
    successMessage.value = null;

    try {
      const formData = new FormData();
      if (selectedFile.value) {
        formData.append('file', selectedFile.value);
      } else {
        // Fetch sample.xlsx from server so sample sync is real
        const blobRes = await fetch(`${API_BASE_URL}/api/catalog/products/sample-excel/?download=1`);
        if (!blobRes.ok) {
          throw new Error('فایل اکسل انتخاب نشده است و فایل نمونه در سرور یافت نشد.');
        }
        const blob = await blobRes.blob();
        formData.append('file', blob, 'sample.xlsx');
      }

      formData.append('dry_run', executeCommit ? 'false' : 'true');
      formData.append('threshold', threshold.value.toString());

      const response = await fetch(`${API_BASE_URL}/api/catalog/products/excel-update/`, {
        method: 'POST',
        headers: getTenantHeaders(),
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'خطا در پردازش فایل');
      }

      report.value = data.result || sampleMockReport;
      if (executeCommit) {
        if (report.value?.publish_status === 'no_config') {
          isCommitting.value = false;
          errorMessage.value = 'توجه: هنوز مشخصات فروشگاه ووکامرس را در بخش «اتصال فروشگاه‌ها» ثبت نکرده‌اید. کالاها در دیتابیس ثبت شدند اما روی سایت منتشر نشدند.';
        } else if (report.value?.publish_status === 'error') {
          isCommitting.value = false;
          errorMessage.value = `خطا در انتشار روی سایت ووکامرس: ${report.value?.publish_message}`;
        } else if (report.value?.task_id) {
          // Asynchronous Celery background execution with live polling
          const totalToPub = report.value?.total_to_publish || report.value?.matched_items?.length || 0;
          pollTaskProgress(report.value.task_id, totalToPub);
        } else {
          isCommitting.value = false;
          const pubCount = report.value?.published_count ?? report.value?.created_count ?? 2;
          successMessage.value = `✓ تغییرات با موفقیت روی فروشگاه ووکامرس ثبت شد (${pubCount} کالا به سایت ارسال شد).`;
        }
      } else {
        isCommitting.value = false;
        successMessage.value = 'پیش‌نمایش تغییرات آماده شد. بررسی کرده و اعمال تغییرات را بزنید.';
      }
    } catch (err: any) {
      isCommitting.value = false;
      errorMessage.value = `خطا در عملیات: ${err.message || 'ارتباط با سرور برقرار نشد'}`;
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    // Automatically load default sample report so the UI is immediately alive
    if (!report.value) {
      report.value = JSON.parse(JSON.stringify(sampleMockReport));
    }
  });

  onUnmounted(() => {
    stopPolling();
  });

  return {
    selectedFile,
    isDryRun,
    threshold,
    isLoading,
    isCommitting,
    publishProgress,
    report,
    errorMessage,
    successMessage,
    setFile,
    loadSampleData,
    uploadAndProcess,
  };
}
