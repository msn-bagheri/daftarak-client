export type NavTab = 
  | 'landing' 
  | 'workflow'
  | 'catalog' 
  | 'category-mapper'
  | 'sync' 
  | 'sync-engine' 
  | 'suppliers' 
  | 'publishing' 
  | 'transformations';

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  accent: 'blue' | 'pink' | 'indigo' | 'violet';
}

export interface TrustMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ChannelPartner {
  id: string;
  nameFa: string;
  nameEn: string;
  badge: string;
  color: string;
  logoIcon: string;
  statusText: string;
}

export interface MockSyncChannel {
  id: string;
  name: string;
  sku: string;
  price: string;
  badge: string;
  statusText: string;
  badgeColor: string;
}
