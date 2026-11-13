<template>
  <div class="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center"
            :class="connection.platform === 'woocommerce' ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'"
          >
            <Store :size="20" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">
              {{ connection.title }}
            </h3>
            <div class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
              {{ connection.details }}
            </div>
          </div>
        </div>

        <!-- Status Badge -->
        <span 
          v-if="connection.status === 'connected'"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>متصل است</span>
        </span>
        <span 
          v-else
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200"
        >
          غیرفعال
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="border-t border-slate-100 pt-4 mt-2 flex items-center justify-between flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <button 
          type="button" 
          class="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
          @click="$emit('edit')"
        >
          {{ connection.platform === 'woocommerce' ? 'ویرایش کلیدها' : 'اتصال با API Key' }}
        </button>

        <button 
          v-if="connection.platform === 'woocommerce' && connection.status === 'connected'"
          type="button" 
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
          @click="$emit('pull-catalog')"
        >
          <DownloadCloud :size="14" />
          <span>دریافت کالاها از سایت</span>
        </button>
      </div>

      <span v-if="connection.status === 'connected'" class="text-[11px] text-slate-400">
        هماهنگی ۲ طرفه فعال
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Store, DownloadCloud } from 'lucide-vue-next';
import type { StoreConnection } from '../types';

defineProps<{
  connection: StoreConnection;
}>();

defineEmits<{
  (e: 'edit'): void;
  (e: 'pull-catalog'): void;
}>();
</script>

