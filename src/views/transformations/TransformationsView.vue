<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">
        فرمول قیمت و سود
      </h1>

      <button 
        type="button" 
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
        :disabled="isSaving"
        @click="saveSettings"
      >
        <Save :size="15" />
        <span>{{ isSaving ? 'در حال ذخیره...' : 'ذخیره تنظیمات' }}</span>
      </button>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div 
        v-if="saveToast" 
        class="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2"
      >
        <CheckCircle2 :size="16" class="text-emerald-400" />
        <span>{{ saveToast }}</span>
      </div>
    </transition>

    <!-- 2 Clean Cards -->
    <div class="space-y-6">
      <!-- Card 1: محاسبه سود (Pricing Formula) -->
      <PricingFormulaCard 
        :settings="settings" 
        :calculated-price="liveCalculatedPrice" 
      />

      <!-- Card 2: محافظت از موجودی (Safety Threshold) -->
      <SafetyThresholdCard 
        :settings="settings" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Save, CheckCircle2 } from 'lucide-vue-next';
import { useTransformations } from './composables/useTransformations';
import PricingFormulaCard from './components/PricingFormulaCard.vue';
import SafetyThresholdCard from './components/SafetyThresholdCard.vue';

const {
  settings,
  isSaving,
  saveToast,
  liveCalculatedPrice,
  saveSettings,
} = useTransformations();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
