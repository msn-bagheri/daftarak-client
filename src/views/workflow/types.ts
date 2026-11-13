import type { NavTab } from '../../App.vue';

export interface DashboardMetrics {
  syncedProducts: number;
  changes24h: number;
  errorsCount: number;
}

export interface LinearStep {
  id: number;
  title: string;
  statusInfo: string;
  isComplete: boolean;
  targetTab: NavTab;
}

export interface RecentUpdateItem {
  id: string;
  productName: string;
  sku: string;
  oldPrice: number;
  newPrice: number;
  timeAgo: string;
  channelStatus: string;
}

export interface OnboardingChecklistItem {
  id: string;
  title: string;
  isCompleted: boolean;
  targetTab: NavTab;
}
