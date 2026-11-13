export type ProfitStrategy = 'fixed_all' | 'by_category';
export type RoundingOption = 'round_1000' | 'round_10000' | 'no_rounding';

export interface CategoryProfitRule {
  id: string;
  name: string;
  profitPercent: number;
}

export interface PricingSettings {
  strategy: ProfitStrategy;
  profitPercent: number;
  roundingRule: RoundingOption;
  categoryRules: CategoryProfitRule[];
  safetyThresholdEnabled: boolean;
  safetyThresholdMinStock: number;
}
