<template>
  <div 
    class="relative rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-white p-8 sm:p-12 text-center transition-all cursor-pointer shadow-xs mb-6 group"
    :class="{ 'border-blue-500 bg-blue-50/20': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <input 
      ref="fileInputRef" 
      type="file" 
      accept=".xlsx, .xls, .csv" 
      class="hidden" 
      @change="onFileChange"
    />

    <div class="flex flex-col items-center justify-center">
      <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        <UploadCloud :size="32" />
      </div>

      <h3 class="text-base sm:text-lg font-bold text-slate-800 mb-1">
        {{ file ? file.name : 'فایل اکسل یا لیست قیمت عمده‌فروش را اینجا رها کنید' }}
      </h3>

      <p class="text-xs sm:text-sm text-slate-500 font-medium mb-4">
        {{ file ? 'فایل با موفقیت انتخاب شد. برای تغییر کلیک کنید.' : 'پشتیبانی از فرمت‌های xlsx, xls, csv' }}
      </p>

      <div class="flex items-center gap-2" @click.stop>
        <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono font-bold">
          .xlsx
        </span>
        <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono font-bold">
          .xls
        </span>
        <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono font-bold">
          .csv
        </span>
        <button 
          type="button" 
          class="mr-2 px-3 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
          @click.stop="$emit('load-sample')"
        >
          بارگذاری فایل نمونه
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UploadCloud } from 'lucide-vue-next';

defineProps<{
  file: File | null;
}>();

const emit = defineEmits<{
  (e: 'file-selected', file: File): void;
  (e: 'load-sample'): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

function triggerFileInput() {
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('file-selected', target.files[0]);
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    emit('file-selected', event.dataTransfer.files[0]);
  }
}
</script>
