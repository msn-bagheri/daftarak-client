<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">
        اتصال فروشگاه‌ها
      </h1>

      <!-- One button: تست برقراری ارتباط with immediate success confirmation -->
      <button 
        type="button" 
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
        :disabled="isTestingConnection"
        @click="testConnection"
      >
        <Activity :size="15" :class="{ 'animate-spin': isTestingConnection }" />
        <span>{{ isTestingConnection ? 'در حال آزمایش ارتباط...' : 'تست برقراری ارتباط' }}</span>
      </button>
    </div>

    <!-- Feedback Banner -->
    <div v-if="testSuccessAlert" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 mb-6 animate-fade-in">
      <CheckCircle2 :size="18" class="text-emerald-600 shrink-0" />
      <span>{{ testSuccessAlert }}</span>
    </div>

    <!-- Connection Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Card 1: فروشگاه ووکامرس -->
      <StoreCard 
        :connection="wooConnection" 
        @edit="isEditingWooModal = true" 
        @pull-catalog="pullStoreCatalog"
      />

      <!-- Card 2: پنل فروشندگان دیجی‌کالا -->
      <StoreCard 
        :connection="digikalaConnection" 
        @edit="isEditingDigikalaModal = true" 
      />
    </div>

    <!-- Dedicated Catalog Pull Card for Connected Store -->
    <div v-if="wooConnection.status === 'connected'" class="mt-6 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs animate-fade-in">
      <div class="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <RefreshCw :size="20" :class="{ 'animate-spin': isPullingCatalog }" />
          </div>
          <div>
            <h2 class="text-base font-bold text-slate-900">همگام‌سازی محصولات از ووکامرس شما</h2>
            <p class="text-xs text-slate-500 mt-0.5">دریافت دسته‌ها، محصولات و ویژگی‌ها از فروشگاه برای تطبیق خودکار با اکسل و عمده‌فروش</p>
          </div>
        </div>

        <button 
          type="button" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          :disabled="isPullingCatalog"
          @click="pullStoreCatalog"
        >
          <DownloadCloud :size="15" />
          <span>{{ isPullingCatalog ? 'در حال دریافت کالاها...' : 'دریافت محصولات از سایتم' }}</span>
        </button>
      </div>

      <!-- Pull Results Summary Chips -->
      <div v-if="pullResult" class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <span class="block text-xs text-slate-500 mb-1">کالاهای دریافت شده</span>
          <span class="text-base font-black text-slate-900">{{ pullResult.totalProducts.toLocaleString('fa-IR') }}</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <span class="block text-xs text-slate-500 mb-1">دسته‌بندی‌های تطبیق‌یافته</span>
          <span class="text-base font-black text-blue-600">{{ pullResult.categoriesCount.toLocaleString('fa-IR') }}</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <span class="block text-xs text-slate-500 mb-1">کالاهای جدید</span>
          <span class="text-base font-black text-emerald-600">{{ pullResult.productsImported.toLocaleString('fa-IR') }}</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <span class="block text-xs text-slate-500 mb-1">بروزرسانی شده</span>
          <span class="text-base font-black text-indigo-600">{{ pullResult.productsUpdated.toLocaleString('fa-IR') }}</span>
        </div>
      </div>
    </div>

    <!-- Modal 1: ویرایش کلیدهای اتصال ووکامرس -->
    <WooCommerceModal 
      v-if="isEditingWooModal" 
      :connection="wooConnection" 
      @close="isEditingWooModal = false" 
      @save="saveWooKeys" 
    />

    <!-- Modal 2: اتصال دیجی‌کالا -->
    <DigikalaModal 
      v-if="isEditingDigikalaModal" 
      :initial-api-key="digikalaConnection.apiKey" 
      @close="isEditingDigikalaModal = false" 
      @save="saveDigikalaKey" 
    />
  </div>
</template>

<script setup lang="ts">
import { Activity, CheckCircle2, RefreshCw, DownloadCloud } from 'lucide-vue-next';
import { useSyncEngine } from './composables/useSyncEngine';
import StoreCard from './components/StoreCard.vue';
import WooCommerceModal from './components/WooCommerceModal.vue';
import DigikalaModal from './components/DigikalaModal.vue';

const {
  wooConnection,
  digikalaConnection,
  isTestingConnection,
  testSuccessAlert,
  isEditingWooModal,
  isEditingDigikalaModal,
  isPullingCatalog,
  pullResult,
  testConnection,
  pullStoreCatalog,
  saveWooKeys,
  saveDigikalaKey,
} = useSyncEngine();
</script>
