export type LogLevel = 'success' | 'info' | 'warning';

export interface SupplierCategory {
  id: string;
  name: string;
  productCount: number;
  isSelected: boolean;
}

export interface SupplierItem {
  id: string;
  name: string;
  status: string;
  productCount: number;
  lastChecked: string;
  isUpdating?: boolean;
  categories?: SupplierCategory[];
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  message: string;
  level: LogLevel;
}
