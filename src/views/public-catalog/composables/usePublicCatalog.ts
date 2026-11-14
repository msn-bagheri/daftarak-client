import { ref, computed } from 'vue';
import type { SupplierProfile, CatalogProduct, OrderInquiryItem, SortOption } from '../types';

const SHOWCASE_STORAGE_KEY = 'daftarak_showcase_profile';

const DEFAULT_PROFILE: SupplierProfile = {
  id: 'sup-1',
  slug: 'pakhsh-markazi',
  name: 'بازرگانی و پخش آریا (لوازم جانبی و دیجیتال)',
  phone: '02166708090',
  secondaryPhone: '09121234567',
  whatsappNumber: '09121234567',
  bio: 'پخش عمده مستقیم از واردکننده، انواع کابل، شارژر، هندزفری و گلس با گارانتی تعویض',
  address: 'تهران، خیابان جمهوری، تقاطع حافظ، مجتمع تجاری علاءالدین، طبقه دوم',
  showPrices: true,
  allowInquiryList: true,
  minOrderTotal: 1000000,
  workingHours: 'شنبه تا چهارشنبه ۹:۳۰ الی ۱۹:۳۰ | پنج‌شنبه ۹:۳۰ الی ۱۵:۰۰',
};

const SAMPLE_PRODUCTS: CatalogProduct[] = [
  {
    id: 'p-1',
    title: 'کابل شارژ سریع Type-C به Type-C اسکار ۱۰۰ وات ۶۰ فوت',
    sku: 'OSC-TC100-GRY',
    category: 'کابل و تبدیل',
    categoryId: 'cables',
    brand: 'اسکار (Oscar)',
    price: 185000,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    inStock: true,
    stockCount: 450,
    packageCount: 10,
    minOrderQty: 10,
    description: 'کابل سوپر فست شارژ ۱۰۰ واتی با روکش کنفی ضخیم مقاوم در برابر خمش و پارگی، دارای چیپست هوشمند E-Marker.',
    specs: {
      'توان خروجی': '۱۰۰ وات (۲۰V/۵A)',
      'طول کابل': '۱.۲ متر',
      'جنس روکش': 'کنفی بافته شده ابریشمی',
      'گارانتی': '۱۲ ماه تعویض بی‌قید و شرط',
    },
    gallery: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 'p-2',
    title: 'شارژر دیواری دو پورت گان ۶۵ وات سامسونگ مدل Super Fast',
    sku: 'SAM-GAN65-WHT',
    category: 'شارژر و آداپتور',
    categoryId: 'chargers',
    brand: 'سامسونگ (Samsung)',
    price: 680000,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60',
    inStock: true,
    stockCount: 120,
    packageCount: 5,
    minOrderQty: 5,
    description: 'آداپتور GaN با راندمان بالا و تولید گرمای بسیار کم، پشتیبانی کامل از پروتکل PD 3.0 و PPS.',
    specs: {
      'پورت‌ها': 'یک خروجی Type-C + یک خروجی USB-A',
      'حداکثر توان': '۶۵ وات فست شارژ',
      'فناوری ساخت': 'GaN (گالیوم نیترید)',
      'بسته‌بندی': 'کارتن اصلی ۵ عددی',
    }
  },
  {
    id: 'p-3',
    title: 'هندزفری بلوتوثی هایلو مدل W1 کیفیت صدای های‌فای',
    sku: 'HYL-W1-BLU',
    category: 'صوتی و هندزفری',
    categoryId: 'audio',
    brand: 'هایلو (Haylou)',
    price: 940000,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    inStock: true,
    stockCount: 80,
    packageCount: 10,
    minOrderQty: 2,
    description: 'مجهز به درایور آرماتور دوگانه نولز، تاخیر بسیار کم برای گیمینگ و ۴ میکروفون نویزکنسلینگ cVc 8.0.',
    specs: {
      'چیپست': 'Qualcomm QCC3040',
      'نسخه بلوتوث': '۵.۲',
      'عمر باتری': 'تا ۲۶ ساعت با کیس',
      'ضد آب': 'استاندارد IPX4',
    }
  },
  {
    id: 'p-4',
    title: 'پاوربانک ۲۰۰۰۰ میلی‌آمپر ۲۲.۵ وات ردمی شیائومی',
    sku: 'MI-PB20K-BLK',
    category: 'پاوربانک',
    categoryId: 'powerbanks',
    brand: 'شیائومی (Xiaomi)',
    price: 1150000,
    imageUrl: 'https://images.unsplash.com/photo-1609592424364-f6b92f4477ee?w=500&auto=format&fit=crop&q=60',
    inStock: false,
    stockCount: 0,
    packageCount: 5,
    minOrderQty: 5,
    description: 'باتری لیتیوم پلیمری با دوام، شارژ ایمن ۱۲ لایه، دارای ورودی تایپ‌سی و میکرو.',
    specs: {
      'ظرفیت': '۲۰۰۰۰ میلی‌آمپر ساعت',
      'پورت‌های ورودی': 'Micro-USB و Type-C',
      'پورت‌های خروجی': 'دو درگاه USB-A',
    }
  },
  {
    id: 'p-5',
    title: 'هولدر و پایه نگهدارنده موبایل دریچه کولری باسئوس',
    sku: 'BAS-HLD-AIR',
    category: 'نگهدارنده و هولدر',
    categoryId: 'holders',
    brand: 'باسئوس (Baseus)',
    price: 320000,
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&auto=format&fit=crop&q=60',
    inStock: true,
    stockCount: 210,
    packageCount: 20,
    minOrderQty: 10,
    description: 'قفل گرانشی خودکار با جاگذاری یک‌دست، گیره فلزی مستحکم با روکش سیلیکونی بدون آسیب به دریچه کولر.',
    specs: {
      'نوع اتصال': 'دریچه کولر خودرو',
      'مکانیزم': 'گرانشی (Gravity)',
      'سازگاری': 'گوشی‌های ۴.۷ تا ۶.۷ اینچ',
    }
  },
  {
    id: 'p-6',
    title: 'پک ۵۰ عددی گلس سرامیکی آنتی‌استاتیک مات آیفون ۱۳ و ۱۴',
    sku: 'GLS-CER-IP13',
    category: 'گلس و محافظ صفحه',
    categoryId: 'glass',
    brand: 'سوپر دی (Super D)',
    price: 490000,
    imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format&fit=crop&q=60',
    inStock: true,
    stockCount: 60,
    packageCount: 50,
    minOrderQty: 1,
    description: 'پک ۵۰ عددی محافظ صفحه سرامیکی با خاصیت ضد انعکاس نور و جلوگیری از جذب لک و چربی.',
    specs: {
      'تعداد در بسته': '۵۰ عدد',
      'ضخامت': '۰.۳۳ میلی‌متر',
      'مقاومت': 'ضد ضربه و نشکن',
    }
  }
];

export function usePublicCatalog() {
  const profile = ref<SupplierProfile>(loadProfile());
  const products = ref<CatalogProduct[]>(SAMPLE_PRODUCTS);
  const selectedCategory = ref<string>('all');
  const searchQuery = ref<string>('');
  const onlyInStock = ref<boolean>(false);
  const sortBy = ref<SortOption>('newest');
  
  const selectedProduct = ref<CatalogProduct | null>(null);
  const isDetailModalOpen = ref<boolean>(false);
  
  const inquiryList = ref<OrderInquiryItem[]>([]);
  const isInquiryDrawerOpen = ref<boolean>(false);

  function loadProfile(): SupplierProfile {
    try {
      const stored = localStorage.getItem(SHOWCASE_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  }

  const categories = computed(() => {
    const list: { id: string; name: string; count: number }[] = [];
    const catMap = new Map<string, { name: string; count: number }>();
    
    products.value.forEach(p => {
      const existing = catMap.get(p.categoryId);
      if (existing) {
        existing.count++;
      } else {
        catMap.set(p.categoryId, { name: p.category, count: 1 });
      }
    });

    catMap.forEach((val, key) => {
      list.push({ id: key, name: val.name, count: val.count });
    });

    return list;
  });

  const filteredProducts = computed(() => {
    return products.value
      .filter(p => {
        if (selectedCategory.value !== 'all' && p.categoryId !== selectedCategory.value) {
          return false;
        }
        if (onlyInStock.value && !p.inStock) {
          return false;
        }
        if (searchQuery.value.trim()) {
          const q = searchQuery.value.trim().toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchBrand = (p.brand || '').toLowerCase().includes(q);
          if (!matchTitle && !matchSku && !matchBrand) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy.value === 'price-asc') return a.price - b.price;
        if (sortBy.value === 'price-desc') return b.price - a.price;
        return 0; // default newest
      });
  });

  const totalInquiryCount = computed(() => {
    return inquiryList.value.reduce((acc, item) => acc + item.quantity, 0);
  });

  const totalInquiryPrice = computed(() => {
    return inquiryList.value.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  function openDetail(product: CatalogProduct) {
    selectedProduct.value = product;
    isDetailModalOpen.value = true;
  }

  function closeDetail() {
    isDetailModalOpen.value = false;
    selectedProduct.value = null;
  }

  function addToInquiry(product: CatalogProduct, qty?: number) {
    const min = product.minOrderQty || 1;
    const addAmount = qty !== undefined ? qty : min;
    const existingIndex = inquiryList.value.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      inquiryList.value[existingIndex].quantity += addAmount;
    } else {
      inquiryList.value.push({ product, quantity: addAmount });
    }
  }

  function updateInquiryQty(productId: string, delta: number) {
    const item = inquiryList.value.find(i => i.product.id === productId);
    if (!item) return;
    const min = item.product.minOrderQty || 1;
    item.quantity += delta;
    if (item.quantity < min) {
      removeFromInquiry(productId);
    }
  }

  function removeFromInquiry(productId: string) {
    inquiryList.value = inquiryList.value.filter(i => i.product.id !== productId);
  }

  function clearInquiryList() {
    inquiryList.value = [];
  }

  function makePhoneCall(numberToCall?: string) {
    const num = numberToCall || profile.value.phone;
    window.location.href = `tel:${num}`;
  }

  function generateInquiryText(): string {
    const header = `سلام و احترام، استعلام قیمت و موجودی از کاتالوگ «${profile.value.name}»:\n\n`;
    const items = inquiryList.value
      .map((item, idx) => `${idx + 1}. ${item.product.title}\n   کد: ${item.product.sku} | تعداد: ${item.quantity}`)
      .join('\n\n');
    const footer = `\n\nلطفاً پیش‌فاکتور و موجودی قطعی را اعلام بفرمایید. باتشکر.`;
    return header + items + footer;
  }

  return {
    profile,
    products,
    categories,
    selectedCategory,
    searchQuery,
    onlyInStock,
    sortBy,
    filteredProducts,
    selectedProduct,
    isDetailModalOpen,
    inquiryList,
    isInquiryDrawerOpen,
    totalInquiryCount,
    totalInquiryPrice,
    openDetail,
    closeDetail,
    addToInquiry,
    updateInquiryQty,
    removeFromInquiry,
    clearInquiryList,
    makePhoneCall,
    generateInquiryText,
  };
}

