<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">
          دسته‌بندی‌ها
        </h1>
        
        <!-- Progress Badge: ۸ از ۱۰ دسته متصل است -->
        <span class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          {{ toPersianDigits(mappedCount) }} از {{ toPersianDigits(sourceCategories.length) }} دسته متصل است
        </span>
      </div>

      <!-- Header Action: تطبیق هوشمند خودکار -->
      <button 
        type="button" 
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
        :disabled="isAutoMatching"
        @click="autoMatchCategories"
      >
        <Sparkles :size="15" />
        <span>{{ isAutoMatching ? 'در حال تطبیق خودکار...' : 'تطبیق هوشمند خودکار' }}</span>
      </button>
    </div>

    <!-- Subtle Toast Notification: تغییر ذخیره شد -->
    <transition name="fade">
      <div 
        v-if="toastMessage" 
        class="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2"
      >
        <CheckCircle2 :size="16" class="text-emerald-400" />
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- 2-Column Match Card Layout -->
    <div class="space-y-3">
      <CategoryMatchCard 
        v-for="sourceCat in sourceCategories" 
        :key="sourceCat.id" 
        :source-category="sourceCat" 
        :target-categories="targetCategories" 
        :mappings="mappings" 
        @update="updateMapping" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sparkles, CheckCircle2 } from 'lucide-vue-next';
import { toPersianDigits } from '../../utils/formatters';
import { useCategoryMapper } from './composables/useCategoryMapper';
import CategoryMatchCard from './components/CategoryMatchCard.vue';

const {
  sourceCategories,
  targetCategories,
  mappings,
  isAutoMatching,
  toastMessage,
  mappedCount,
  updateMapping,
  autoMatchCategories,
} = useCategoryMapper();
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
