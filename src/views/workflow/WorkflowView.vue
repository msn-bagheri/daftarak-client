<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">
        میز کار
      </h1>

      <button 
        type="button" 
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
        :disabled="isRefreshing"
        @click="refreshDashboard"
      >
        <RefreshCw :size="14" :class="{ 'animate-spin': isRefreshing }" />
        <span>به‌روزرسانی وضعیت</span>
      </button>
    </div>

    <!-- 3 Summary Metric Cards: Synced (Green), 24h Changes (Blue), Errors (Red) -->
    <SummaryMetrics :metrics="metrics" />

    <!-- Inline Onboarding Checklist (Embedded as requested) -->
    <OnboardingChecklist 
      :items="onboardingChecklist" 
      @navigate="tab => $emit('navigate', tab)" 
    />

    <!-- Linear Step Tracker: 4 Steps with Checkmarks -->
    <LinearStepTracker 
      :steps="linearSteps" 
      @navigate="tab => $emit('navigate', tab)" 
    />

    <!-- Recent Updates Feed (Natural Persian) -->
    <RecentUpdatesFeed :updates="recentUpdates" />
  </div>
</template>

<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next';
import { useWorkflow } from './composables/useWorkflow';
import SummaryMetrics from './components/SummaryMetrics.vue';
import OnboardingChecklist from './components/OnboardingChecklist.vue';
import LinearStepTracker from './components/LinearStepTracker.vue';
import RecentUpdatesFeed from './components/RecentUpdatesFeed.vue';
import type { NavTab } from '../../App.vue';

defineEmits<{
  (e: 'navigate', tab: NavTab): void;
}>();

const {
  isRefreshing,
  metrics,
  linearSteps,
  recentUpdates,
  onboardingChecklist,
  refreshDashboard,
} = useWorkflow();
</script>
