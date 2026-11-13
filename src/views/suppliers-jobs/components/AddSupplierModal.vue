<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in" dir="rtl">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <Truck :size="18" class="text-blue-600" />
          <h2 class="text-base font-bold text-slate-900">افزودن سایت تأمین‌کننده (ووکامرس)</h2>
        </div>
        <button 
          type="button" 
          class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Modal Body -->
      <form class="p-6 space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            نام تأمین‌کننده یا عمده‌فروش
          </label>
          <input 
            v-model="name"
            type="text"
            required
            placeholder="مثلاً: بازرگانی تکنوسان"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            آدرس وب‌سایت تأمین‌کننده (سایت ووکامرسی)
          </label>
          <input 
            v-model="baseUrl"
            type="url"
            required
            placeholder="https://supplier-shop.com"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-2">
            نوع دسترسی به محصولات
          </label>
          <div class="space-y-2">
            <label class="flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors" :class="connectionType === 'public' ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'">
              <input 
                v-model="connectionType"
                type="radio" 
                value="public" 
                class="mt-0.5 text-blue-600 focus:ring-blue-500" 
              />
              <div>
                <span class="block text-xs font-bold text-slate-800">خواندن خودکار کاتالوگ (Store API ووکامرس)</span>
                <span class="block text-[11px] text-slate-500 mt-0.5">بدون نیاز به کلید یا دسترسی ادمین؛ محصولات، قیمت و موجودی عمومی سایت خوانده می‌شوند.</span>
              </div>
            </label>

            <label class="flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors" :class="connectionType === 'keys' ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'">
              <input 
                v-model="connectionType"
                type="radio" 
                value="keys" 
                class="mt-0.5 text-blue-600 focus:ring-blue-500" 
              />
              <div>
                <span class="block text-xs font-bold text-slate-800">کلید اختصاصی همکاری (WooCommerce REST API)</span>
                <span class="block text-[11px] text-slate-500 mt-0.5">در صورتی که تأمین‌کننده به شما کلیدهای Consumer Key و Secret ارائه داده است.</span>
              </div>
            </label>
          </div>
        </div>

        <div v-if="connectionType === 'keys'" class="space-y-3 pt-2">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Consumer Key</label>
            <input 
              v-model="consumerKey" 
              type="text" 
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-left" 
              dir="ltr" 
              placeholder="ck_..."
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Consumer Secret</label>
            <input 
              v-model="consumerSecret" 
              type="password" 
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-left" 
              dir="ltr" 
              placeholder="cs_..."
            />
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            @click="$emit('close')"
          >
            انصراف
          </button>
          <button 
            type="submit" 
            class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            ثبت تأمین‌کننده
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Truck, X } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', payload: { name: string; baseUrl: string; connectionType: string; consumerKey?: string; consumerSecret?: string }): void;
}>();

const name = ref('');
const baseUrl = ref('');
const connectionType = ref<'public' | 'keys'>('public');
const consumerKey = ref('');
const consumerSecret = ref('');

function handleSubmit() {
  if (!name.value || !baseUrl.value) return;
  emit('save', {
    name: name.value,
    baseUrl: baseUrl.value,
    connectionType: connectionType.value,
    consumerKey: consumerKey.value || undefined,
    consumerSecret: consumerSecret.value || undefined,
  });
}
</script>

