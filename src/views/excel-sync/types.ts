export interface DiffChanges {
  regular_price?: {
    old: string | null;
    new: string;
    delta_percent?: number;
  };
  stock_quantity?: {
    old: number | null;
    new: number;
  };
}

export interface MatchedItem {
  row_number: number;
  excel_name: string;
  excel_sku: string;
  product_id: string;
  product_name: string;
  match_type: 'sku_exact' | 'name_exact' | 'fuzzy' | 'created';
  match_score: number;
  current_price?: string | null;
  current_stock?: number | null;
  diff: {
    has_changes: boolean;
    changes: DiffChanges;
  };
}

export interface UnmatchedItem {
  row_number: number;
  excel_name: string;
  excel_sku: string;
  excel_price: string | null;
  excel_stock: number | null;
}

export interface PublishProgress {
  taskId: string;
  state: 'PENDING' | 'PROGRESS' | 'SUCCESS' | 'FAILURE';
  current: number;
  total: number;
  percent: number;
  currentProduct?: string;
  published: number;
  failed: number;
  statusText?: string;
  error?: string;
}

export interface SyncReport {
  dry_run: boolean;
  total_rows: number;
  created_count?: number;
  matched_count: number;
  price_changed_count: number;
  out_of_stock_count: number;
  matched_sku_exact_count: number;
  matched_name_exact_count: number;
  matched_fuzzy_count: number;
  unmatched_count: number;
  matched_items: MatchedItem[];
  created_items?: MatchedItem[];
  unmatched_items: UnmatchedItem[];
  task_id?: string;
  total_to_publish?: number;
  publish_status?: 'success' | 'error' | 'no_config' | 'queued';
  publish_message?: string;
  published_count?: number;
  publish_failed_count?: number;
}
