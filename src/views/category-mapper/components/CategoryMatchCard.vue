<template>
  <div class="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row items-center justify-between gap-4">
    <!-- Column 1: دسته در سایت تأمین‌کننده -->
    <div class="w-full md:w-5/12 flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        <Folder :size="18" />
      </div>
      <div class="min-w-0">
        <div class="text-xs text-slate-400 font-medium mb-0.5">
          دسته در سایت تأمین‌کننده ({{ sourceCategory.source_shop_name || 'تأمین‌کننده' }})
        </div>
        <div class="text-sm font-bold text-slate-800 truncate" :title="sourceCategory.name">
          {{ sourceCategory.name }}
        </div>
      </div>
    </div>

    <!-- Center Arrow -->
    <div class="shrink-0 text-slate-400 flex items-center justify-center">
      <span class="text-slate-400 text-lg hidden md:inline">➔</span>
      <span class="text-slate-400 text-lg md:hidden">↓</span>
    </div>

    <!-- Column 2: دسته در سایت شما (Searchable / Select Dropdown) -->
    <div class="w-full md:w-5/12">
      <div class="text-xs text-slate-400 font-medium mb-1">
        دسته در سایت شما
      </div>
      <select 
        :value="currentMappedId" 
        class="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
        @change="onCategoryChanged"
      >
        <option value="">— انتخاب دسته‌بندی در سایت شما —</option>
        <option 
          v-for="target in targetCategories" 
          :key="target.id" 
          :value="target.id"
        >
          {{ target.name }}
        </option>
      </select>
    </div>

    <!-- Status Indicator Icon -->
    <div class="shrink-0 flex items-center justify-end w-6">
      <span 
        v-if="currentMappedId" 
        class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center" 
        title="متصل شده"
      >
        <Check :size="14" />
      </span>
      <span 
        v-else 
        class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center" 
        title="در انتظار انتخاب"
      >
        <Minus :size="14" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Folder, Check, Minus } from 'lucide-vue-next';
import type { SourceCategoryItem, TargetCategoryItem, CategoryMappingRecord } from '../types';

const props = defineProps<{
  sourceCategory: SourceCategoryItem;
  targetCategories: TargetCategoryItem[];
  mappings: CategoryMappingRecord[];
}>();

const emit = defineEmits<{
  (e: 'update', sourceId: string, targetId: string | null): void;
}>();

const currentMappedId = computed(() => {
  const m = props.mappings.find(item => item.source_category === props.sourceCategory.id);
  return m?.internal_category || '';
});

function onCategoryChanged(event: Event) {
  const target = event.target as HTMLSelectElement;
  const val = target.value || null;
  emit('update', props.sourceCategory.id, val);
}
</script>

