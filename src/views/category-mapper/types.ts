export interface SourceCategoryItem {
  id: string;
  name: string;
  source_shop_name?: string;
  product_count?: number;
  confidenceScore?: number;
  confidenceReason?: string;
  suggestedTargetId?: string;
}

export interface TargetCategoryItem {
  id: string;
  name: string;
  slug?: string;
  product_count?: number;
}

export interface CategoryMappingRecord {
  id?: string;
  source_category: string;
  source_category_name?: string;
  internal_category: string | null;
  internal_category_name?: string;
  confidenceScore?: number;
  is_active: boolean;
}
