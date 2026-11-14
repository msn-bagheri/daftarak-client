export interface SupplierProfile {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  phone: string; // Mandatory contact channel
  secondaryPhone?: string; // Optional
  whatsappNumber?: string; // Optional
  bio?: string;
  address?: string; // Optional
  showPrices: boolean; // If false, displays "استعلام تلفنی"
  allowInquiryList: boolean;
  minOrderTotal?: number;
  workingHours?: string;
  acceptsCash?: boolean;
  acceptsCheque?: boolean;
  acceptsCredit?: boolean;
  shippingNotes?: string;
}

export interface CatalogProduct {
  id: string;
  title: string;
  sku: string;
  category: string;
  categoryId: string;
  brand?: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  stockCount?: number;
  packageCount?: number; // e.g. بسته ۱۰ عددی or تعداد در کارتن: ۵۰
  minOrderQty?: number; // MOQ
  description?: string;
  specs?: Record<string, string>;
  gallery?: string[];
}

export interface OrderInquiryItem {
  product: CatalogProduct;
  quantity: number;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';
