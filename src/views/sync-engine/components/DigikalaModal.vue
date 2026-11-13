<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in" dir="rtl">
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-base font-bold text-slate-900">
          اتصال به پنل فروشندگان دیجی‌کالا
        </h3>
        <button 
          type="button" 
          class="text-slate-400 hover:text-slate-600 transition-colors"
          @click="$emit('close')"
        >
          <X :size="18" />
        </button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            کلید دسترسی (API Key) پنل سلر
          </label>
          <input 
            v-model="apiKey" 
            type="text" 
            dir="ltr"
            placeholder="توکن وب‌سرویس فروشندگان..." 
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
          />
        </div>

        <div class="flex items-center justify-end gap-2 pt-3">
          <button 
            type="button" 
            class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            @click="$emit('close')"
          >
            انصراف
          </button>

          <button 
            type="submit" 
            class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            اتصال
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps<{
  initialApiKey?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', key: string): void;
}>();

const apiKey = ref(props.initialApiKey || '');

function handleSave() {
  emit('save', apiKey.value);
}
</script>

