<template>
  <div class="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
    <div>
      <!-- Header: Logo / Brand Name -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
            <Truck :size="20" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">
              {{ supplier.name }}
            </h3>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 mt-1">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              {{ supplier.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Summary Row: ۱,۲۰۰ کالا دریافت شده | آخرین بررسی: ۱۵ دقیقه پیش -->
      <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 my-4 text-xs">
        <div class="text-slate-600">
          <span class="font-bold text-slate-900 font-mono">{{ formatNumberFa(supplier.productCount) }}</span>
          <span> کالا دریافت شده</span>
        </div>
        <div class="text-slate-400 font-medium">
          آخرین بررسی: {{ supplier.lastChecked }}
        </div>
      </div>
    </div>

    <!-- Actions Row -->
    <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
      <button 
        type="button" 
        class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        @click="$emit('manage-categories', supplier.id)"
      >
        <FolderTree :size="14" class="text-blue-600" />
        <span>دسته‌های واردات</span>
      </button>

      <button 
        type="button" 
        class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
        :disabled="supplier.isUpdating"
        @click="$emit('update', supplier.id)"
      >
        <RefreshCw :size="14" :class="{ 'animate-spin': supplier.isUpdating }" />
        <span>{{ supplier.isUpdating ? 'در حال دریافت...' : 'بروزرسانی دستی' }}</span>
      </button>

      <button
        type="button"
        title="حذف تأمین‌کننده"
        class="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors cursor-pointer"
        @click="$emit('remove', supplier.id)"
      >
        <Trash2 :size="14" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Truck, RefreshCw, FolderTree, Trash2 } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { SupplierItem } from '../types';

defineProps<{
  supplier: SupplierItem;
}>();

defineEmits<{
  (e: 'update', id: string): void;
  (e: 'manage-categories', id: string): void;
  (e: 'remove', id: string): void;
}>();
</script>
