import { ref, computed } from 'vue';
import type { PricingSettings, RoundingOption } from '../types';

export function useTransformations() {
  const isSaving = ref<boolean>(false);
  const saveToast = ref<string | null>(null);

  const settings = ref<PricingSettings>({
    strategy: 'fixed_all',
    profitPercent: 15,
    roundingRule: 'round_1000',
    categoryRules: [
      { id: 'cat-1', name: 'کابل و شارژر', profitPercent: 20 },
      { id: 'cat-2', name: 'هدفون و هندزفری', profitPercent: 18 },
      { id: 'cat-3', name: 'لوازم جانبی موبایل', profitPercent: 25 },
    ],
    safetyThresholdEnabled: true,
    safetyThresholdMinStock: 3,
  });

  function calculateSamplePrice(baseAmount = 100000): number {
    const profit = (baseAmount * settings.value.profitPercent) / 100;
    const raw = baseAmount + profit;

    switch (settings.value.roundingRule) {
      case 'round_1000':
        return Math.ceil(raw / 1000) * 1000;
      case 'round_10000':
        return Math.ceil(raw / 10000) * 10000;
      case 'no_rounding':
      default:
        return Math.round(raw);
    }
  }

  const liveCalculatedPrice = computed(() => {
    return calculateSamplePrice(100000);
  });

  function saveSettings() {
    isSaving.value = true;
    setTimeout(() => {
      isSaving.value = false;
      saveToast.value = 'تنظیمات سود و موجودی با موفقیت ذخیره شد';
      setTimeout(() => {
        saveToast.value = null;
      }, 3000);
    }, 400);
  }

  function setRoundingRule(rule: RoundingOption) {
    settings.value.roundingRule = rule;
  }

  return {
    settings,
    isSaving,
    saveToast,
    liveCalculatedPrice,
    calculateSamplePrice,
    saveSettings,
    setRoundingRule,
  };
}
