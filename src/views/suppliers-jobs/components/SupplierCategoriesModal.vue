<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in" dir="rtl">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
        <div class="flex items-center gap-2.5">
          <FolderTree :size="19" class="text-blue-600" />
          <div>
            <h2 class="text-base font-bold text-slate-900">دسته‌بندی‌های مجاز برای واردات</h2>
            <p class="text-xs text-slate-400 mt-0.5">تأمین‌کننده: {{ supplier.name }}</p>
          </div>
        </div>
        <button 
          type="button" 
          class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Search & Quick Selection Toolbar -->
      <div class="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 flex-wrap">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="15" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="جستجوی دسته‌بندی..."
            class="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-hidden focus:border-blue-500"
          />
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            type="button"
            class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
            @click="selectAll"
          >
            انتخاب همه
          </button>
          <button 
            type="button"
            class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
            @click="deselectAll"
          >
            عدم انتخاب
          </button>
        </div>
      </div>

      <!-- Categories List -->
      <div class="p-6 overflow-y-auto space-y-2 flex-1">
        <div 
          v-for="cat in filteredCategories" 
          :key="cat.id"
          class="flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer"
          :class="selectedIds.has(cat.id) ? 'border-blue-300 bg-blue-50/40' : 'border-slate-100 hover:bg-slate-50'"
          @click="toggleCategory(cat.id)"
        >
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              :checked="selectedIds.has(cat.id)"
              class="rounded text-blue-600 focus:ring-blue-500 cursor-pointer pointer-events-none" 
            />
            <span class="text-xs font-bold text-slate-800">{{ cat.name }}</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {{ cat.productCount.toLocaleString('fa-IR') }} کالا
            </span>
            <span 
              class="text-[10px] font-bold px-2 py-0.5 rounded-full"
              :class="selectedIds.has(cat.id) ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'"
            >
              {{ selectedIds.has(cat.id) ? 'وارد می‌شود' : 'نادیده' }}
            </span>
          </div>
        </div>

        <div v-if="filteredCategories.length === 0" class="text-center py-8 text-xs text-slate-400">
          دسته‌بندی با این مشخصات یافت نشد.
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 shrink-0">
        <span class="text-xs text-slate-500 font-bold">
          {{ selectedIds.size.toLocaleString('fa-IR') }} از {{ categories.length.toLocaleString('fa-IR') }} دسته انتخاب شده است
        </span>

        <div class="flex items-center gap-2">
          <button 
            type="button" 
            class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            @click="$emit('close')"
          >
            انصراف
          </button>
          <button 
            type="button" 
            class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            @click="handleSave"
          >
            ذخیره و محدودسازی واردات
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FolderTree, Search, X } from 'lucide-vue-next';
import type { SupplierItem, SupplierCategory } from '../types';

const props = defineProps<{
  supplier: SupplierItem;
  categories: SupplierCategory[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', selectedIds: string[]): void;
}>();

const searchQuery = ref('');
const selectedIds = ref<Set<string>>(
  new Set(props.categories.filter(c => c.isSelected).map(c => c.id))
);

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) return props.categories;
  const q = searchQuery.value.trim().toLowerCase();
  return props.categories.filter(c => c.name.toLowerCase().includes(q));
});

function toggleCategory(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id);
  } else {
    selectedIds.value.add(id);
  }
}

function selectAll() {
  props.categories.forEach(c => selectedIds.value.add(c.id));
}

function deselectAll() {
  selectedIds.value.clear();
}

function handleSave() {
  emit('save', Array.from(selectedIds.value));
}
</script>

