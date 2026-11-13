<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">
        آپدیت با اکسل
      </h1>

      <button 
        type="button" 
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
        @click="loadSampleData"
      >
        <Sparkles :size="14" />
        <span>بارگذاری فایل نمونه</span>
      </button>
    </div>

    <!-- Feedback Banner -->
    <div v-if="successMessage" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2 mb-6">
      <CheckCircle2 :size="18" class="text-emerald-600" />
      <span>{{ successMessage }}</span>
    </div>

    <div v-if="errorMessage" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-bold flex items-center gap-2 mb-6">
      <AlertCircle :size="18" class="text-rose-600" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Top Section (Dropzone) -->
    <FileDropzone 
      :file="selectedFile" 
      @file-selected="setFile" 
      @load-sample="loadSampleData"
    />

    <!-- Auto-Detection Banner (Post-Upload) -->
    <AutoDetectionBanner 
      v-if="report"
      :total-products="report.total_rows || 250"
      :price-changes="report.price_changed_count || 45"
      :out-of-stock="report.out_of_stock_count || 3"
      :created-products="report.created_count || 0"
    />

    <!-- Live Celery Progress Bar -->
    <PublishProgressBar :progress="publishProgress" />

    <!-- Clean Diff Table (4 Columns) with Sticky Action Footer -->
    <DiffTable 
      v-if="report && report.matched_items.length > 0" 
      :items="report.matched_items" 
      :is-committing="isCommitting"
      @commit="uploadAndProcess(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { useExcelSync } from './composables/useExcelSync';
import FileDropzone from './components/FileDropzone.vue';
import AutoDetectionBanner from './components/AutoDetectionBanner.vue';
import PublishProgressBar from './components/PublishProgressBar.vue';
import DiffTable from './components/DiffTable.vue';

const {
  selectedFile,
  isCommitting,
  publishProgress,
  report,
  errorMessage,
  successMessage,
  setFile,
  loadSampleData,
  uploadAndProcess,
} = useExcelSync();
</script>
