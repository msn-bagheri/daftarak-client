export type CatalogFilterTab = 'all' | 'price-changed' | 'out-of-stock' | 'uncategorized';

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  costPrice: number;
  salePrice: number;
  profit: number;
  stockQuantity: number;
  isAvailable: boolean;
  hasPriceChange: boolean;
  hasCategory: boolean;
  isActiveOnSite: boolean;
  imageUrl: string;
}
