export interface WooCommerceConfig {
  id: string;
  store_name: string;
  base_url: string;
  consumer_key: string;
  consumer_secret: string;
  enabled: boolean;
  tenant?: string | null;
  created_at?: string;
}

export interface ConnectionReport {
  status?: string;
  success?: boolean;
  message?: string;
  store_info?: {
    name?: string;
    description?: string;
    version?: string;
  };
  error?: string;
}

export interface CategoryMapping {
  id: string;
  source_category?: string | null;
  source_category_name?: string;
  internal_category?: string | null;
  internal_category_name?: string;
  woo_category_id: string;
  woo_category_name: string;
  enabled: boolean;
  allow_out_of_stock: boolean;
  tenant?: string | null;
  created_at?: string;
}

export interface WooProductMapping {
  id: string;
  source_product: string;
  source_product_name?: string;
  source_product_sku?: string;
  woo_product_id: string;
  woo_product_type: string;
  last_synced_at: string;
  sync_status: 'synced' | 'error';
  last_error: string;
  data_hash: string;
}

export interface SourceCategoryOption {
  id: string;
  name: string;
  slug?: string;
}

export interface InternalCategoryOption {
  id: string;
  name: string;
}

export interface ProductOption {
  id: string;
  name: string;
  sku?: string;
}
