<template>
  <div class="bg-white border-b border-slate-200/80 py-2.5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
        
        <!-- All Categories Button -->
        <button
          type="button"
          class="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none"
          :class="selectedCategory === 'all' 
            ? 'bg-blue-600 text-white shadow-xs' 
            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'"
          @click="$emit('select-category', 'all')"
        >
          <Layers :size="13" />
          <span>همه دسته‌ها</span>
          <span 
            class="text-[10px] px-1.5 py-0.2 rounded-full"
            :class="selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'"
          >
            {{ totalCount }}
          </span>
        </button>

        <!-- Dynamic Category Pills -->
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none"
          :class="selectedCategory === cat.id 
            ? 'bg-blue-600 text-white shadow-xs' 
            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'"
          @click="$emit('select-category', cat.id)"
        >
          <span>{{ cat.name }}</span>
          <span 
            class="text-[10px] px-1.5 py-0.2 rounded-full"
            :class="selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'"
          >
            {{ cat.count }}
          </span>
        </button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Layers } from 'lucide-vue-next';

defineProps<{
  categories: { id: string; name: string; count: number }[];
  selectedCategory: string;
  totalCount: number;
}>();

defineEmits<{
  (e: 'select-category', categoryId: string): void;
}>();
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

