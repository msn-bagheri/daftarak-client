import { ref } from 'vue';
import type { FeatureItem, TrustMetric, ChannelPartner, MockSyncChannel } from '../types';

export function useLandingPage() {
  const trustMetrics = ref<TrustMetric[]>([
    {
      id: 'speed',
      value: '< ۴۵ ثانیه',
      label: 'سرعت همگام‌سازی آنی',
      description: 'انعکاس بلافاصله قیمت و موجودی در دیجی‌کالا و ترب',
      iconName: 'Zap',
    },
    {
      id: 'penalty',
      value: '۰ ریال',
      label: 'جریمه نوسان و ناموجودی',
      description: 'حذف کامل خطای انسانی و لغو سفارش در مارکت‌پلیس‌ها',
      iconName: 'ShieldCheck',
    },
    {
      id: 'growth',
      value: '+۳۴۰٪',
      label: 'رشد فروش کانال‌ها',
      description: 'افزایش کلیک و خرید با کسب جایگاه اول رقابتی',
      iconName: 'TrendingUp',
    },
    {
      id: 'timesave',
      value: '۱۵ ساعت/هفته',
      label: 'صرفه‌جویی در زمان',
      description: 'خداحافظی با به‌روزرسانی دستی تک‌تک محصولات',
      iconName: 'Clock',
    },
  ]);

  const features = ref<FeatureItem[]>([
    {
      id: 'instant-sync',
      title: 'همگام‌سازی خودکار در کمتر از ۴۵ ثانیه',
      subtitle: 'پایان دغدغه نوسان ارز و اتمام موجودی',
      description: 'هر تغییری در انبار شما، بلافاصله و با صف‌های پردازش سریع در دیجی‌کالا، ترب، باسلام و ووکامرس اعمال می‌شود تا هیچ سفارشی به دلیل قیمت قدیمی لغو نشود.',
      iconName: 'Zap',
      badge: 'هسته همگام‌سازی هوشمند',
      accent: 'blue',
    },
    {
      id: 'smart-pricing',
      title: 'ربات هوشمند قیمت‌گذاری و تصاحب جعبه خرید',
      subtitle: 'حفظ بالاترین حاشیه سود بدون ارزان‌فروشی',
      description: 'پایش مستمر و لحظه‌ای رقبای شما در ترب و دیجی‌کالا. سیستم به صورت خودکار قیمت شما را با حفظ کف قیمت مجاز (Stop-Loss) در جایگاه برنده نگه می‌دارد.',
      iconName: 'TrendingUp',
      badge: 'الگوریتم رشد سود',
      accent: 'pink',
    },
    {
      id: 'excel-automation',
      title: 'اتوماسیون فیدهای اکسل و تأمین‌کنندگان',
      subtitle: 'ورود و به‌روزرسانی هزاران کالا با یک کلیک',
      description: 'فایل اکسل یا وب‌هوک تأمین‌کننده خود را بارگذاری کنید. فرمول‌های درصد سود، مالیات و گردکردن قیمت را تعریف کنید و همه کانال‌ها را یکجا آپدیت کنید.',
      iconName: 'FileSpreadsheet',
      badge: 'مدیریت اکسل و فیدها',
      accent: 'indigo',
    },
    {
      id: 'unified-catalog',
      title: 'داشبورد متمرکز کاتالوگ و نگاشت دسته‌ها',
      subtitle: 'یک مرکز فرماندهی برای تمام کانال‌های فروش',
      description: 'نگاشت هوشمند دسته‌بندی‌ها و مشخصات فنی کالاها میان مارکت‌پلیس‌های مختلف، بدون نیاز به ورود مجدد اطلاعات در پنل‌های متعدد.',
      iconName: 'Layers',
      badge: 'کاتالوگ یکپارچه',
      accent: 'violet',
    },
  ]);

  const channelPartners = ref<ChannelPartner[]>([
    {
      id: 'digikala',
      nameFa: 'دیجی‌کالا',
      nameEn: 'Digikala',
      badge: 'اتصال رسمی به Open API',
      color: '#ef394e',
      logoIcon: 'ShoppingBag',
      statusText: 'به‌روزرسانی خودکار DKPC و برنده جعبه خرید',
    },
    {
      id: 'torob',
      nameFa: 'ترب',
      nameEn: 'Torob',
      badge: 'فید آنی و Instant API',
      color: '#d32f2f',
      logoIcon: 'Search',
      statusText: 'پایش قیمت رقبا و کسب جایگاه اول کلیک',
    },
    {
      id: 'basalam',
      nameFa: 'باسلام',
      nameEn: 'Basalam',
      badge: 'پروتکل OAuth2',
      color: '#ff6f00',
      logoIcon: 'Store',
      statusText: 'همگام‌سازی موجودی غرفه و قیمت فروش',
    },
    {
      id: 'technolife',
      nameFa: 'تکنولایف',
      nameEn: 'Technolife',
      badge: 'فروشگاه تخصصی دیجیتال',
      color: '#1565c0',
      logoIcon: 'Smartphone',
      statusText: 'تطبیق گارانتی، رجیستری و نوسان ارز',
    },
    {
      id: 'woocommerce',
      nameFa: 'ووکامرس / سایت شخصی',
      nameEn: 'WooCommerce',
      badge: 'وب‌هوک دوطرفه',
      color: '#7f54b3',
      logoIcon: 'Globe',
      statusText: 'یکپارچگی مستقیم با دیتابیس سایت شما',
    },
  ]);

  const mockProduct = ref({
    title: 'گوشی موبایل سامسونگ Galaxy S24 Ultra (512GB)',
    sku: 'SKU-SAM-S24U',
    stock: 18,
    costPrice: '۶۸,۵۰۰,۰۰۰',
    salePrice: '۷۱,۴۹۰,۰۰۰',
    channels: [
      {
        id: 'digikala',
        name: 'دیجی‌کالا',
        sku: 'DKP-14920',
        price: '۷۱,۴۹۰,۰۰۰ تومان',
        badge: 'برنده جعبه خرید (Buy Box)',
        statusText: 'همگام در ۳۰ ثانیه',
        badgeColor: 'emerald',
      },
      {
        id: 'torob',
        name: 'ترب',
        sku: 'TRB-8832',
        price: '۷۱,۴۸۰,۰۰۰ تومان',
        badge: 'رتبه ۱ کمترین قیمت',
        statusText: 'فید آنی فعال',
        badgeColor: 'blue',
      },
      {
        id: 'basalam',
        name: 'باسلام',
        sku: 'BSL-9941',
        price: '۷۱,۴۹۰,۰۰۰ تومان',
        badge: 'غرفه فعال',
        statusText: 'موجودی هماهنگ',
        badgeColor: 'amber',
      },
      {
        id: 'woocommerce',
        name: 'سایت شما',
        sku: 'WC-0012',
        price: '۷۱,۴۹۰,۰۰۰ تومان',
        badge: 'فروشگاه اصلی',
        statusText: 'انبار مرکزی',
        badgeColor: 'purple',
      },
    ] as MockSyncChannel[],
  });

  return {
    trustMetrics,
    features,
    channelPartners,
    mockProduct,
  };
}
