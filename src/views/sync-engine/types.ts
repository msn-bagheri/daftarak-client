export type StorePlatform = 'woocommerce' | 'digikala';

export interface StoreConnection {
  id: string;
  platform: StorePlatform;
  title: string;
  status: 'connected' | 'disconnected';
  details: string;
  siteUrl: string;
  consumerKey: string;
  consumerSecret: string;
  apiKey?: string;
}

export interface PullCatalogResult {
  categoriesCount: number;
  productsImported: number;
  productsUpdated: number;
  totalProducts: number;
}
