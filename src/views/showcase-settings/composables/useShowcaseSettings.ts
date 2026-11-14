import { ref } from 'vue';
import type { ShowcaseProfileData } from '../types';

const SHOWCASE_STORAGE_KEY = 'daftarak_showcase_profile';

const INITIAL_PROFILE: ShowcaseProfileData = {
  slug: 'pakhsh-markazi',
  name: 'بازرگانی و پخش آریا (لوازم جانبی و دیجیتال)',
  phone: '02166708090',
  secondaryPhone: '09121234567',
  whatsappNumber: '09121234567',
  bio: 'پخش عمده مستقیم از واردکننده، انواع کابل، شارژر، هندزفری و گلس با گارانتی تعویض',
  address: 'تهران، خیابان جمهوری، مجتمع تجاری علاءالدین، طبقه دوم',
  workingHours: 'شنبه تا چهارشنبه ۹:۳۰ الی ۱۹:۳۰ | پنج‌شنبه ۹:۳۰ الی ۱۵:۰۰',
  showPrices: true,
  allowInquiryList: true,
  minOrderTotal: 1000000,
  acceptsCash: true,
  acceptsCheque: true,
  acceptsCredit: true,
  shippingNotes: 'ارسال با باربری‌های معتبر (وطن، پیشتاز)، تیپاکس و پیک در تهران',
};

export function useShowcaseSettings() {
  const profile = ref<ShowcaseProfileData>(loadStoredProfile());
  const isSaving = ref<boolean>(false);
  const saveSuccess = ref<boolean>(false);
  const errorMessage = ref<string>('');

  function loadStoredProfile(): ShowcaseProfileData {
    try {
      const saved = localStorage.getItem(SHOWCASE_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return INITIAL_PROFILE;
  }

  function getPublicCatalogUrl(): string {
    const origin = window.location.origin;
    return `${origin}/#public-catalog`;
  }

  function copyCatalogUrl(): boolean {
    const url = getPublicCatalogUrl();
    navigator.clipboard.writeText(url);
    return true;
  }

  async function saveProfile(): Promise<boolean> {
    errorMessage.value = '';
    saveSuccess.value = false;

    // Validate mandatory fields
    if (!profile.value.name.trim()) {
      errorMessage.value = 'لطفاً نام فروشگاه یا بازرگانی را وارد کنید.';
      return false;
    }

    if (!profile.value.phone.trim()) {
      errorMessage.value = 'شماره تلفن تماس اصلی اجباری است (جهت ارتباط مستقیم خریداران).';
      return false;
    }

    isSaving.value = true;
    try {
      // Save locally
      localStorage.setItem(SHOWCASE_STORAGE_KEY, JSON.stringify(profile.value));
      saveSuccess.value = true;
      setTimeout(() => {
        saveSuccess.value = false;
      }, 3500);
      return true;
    } catch (e: any) {
      errorMessage.value = 'خطا در ذخیره‌سازی اطلاعات: ' + (e?.message || 'خطای ناشناخته');
      return false;
    } finally {
      isSaving.value = false;
    }
  }

  return {
    profile,
    isSaving,
    saveSuccess,
    errorMessage,
    getPublicCatalogUrl,
    copyCatalogUrl,
    saveProfile,
  };
}

