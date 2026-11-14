<template>
  <div class="max-w-4xl mx-auto space-y-6 pb-12">
    
    <!-- View Header -->
    <div class="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-200/80">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          ویترین و کاتالوگ اختصاصی همکاران
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          تنظیمات صفحه اختصاصی کاتالوگ عمومی جهت اشتراک‌گذاری با خریداران و سفارش‌گیری تلفنی
        </p>
      </div>

      <!-- Save Button in Header -->
      <button
        type="button"
        class="btn-gradient-primary text-xs sm:text-sm !py-2.5 !px-5 flex items-center gap-2 cursor-pointer shadow-md shadow-pink-500/15"
        :disabled="isSaving"
        @click="saveProfile"
      >
        <Save :size="15" />
        <span>{{ isSaving ? 'در حال ذخیره‌سازی...' : 'ذخیره تغییرات' }}</span>
      </button>
    </div>

    <!-- Success Feedback Alert -->
    <div 
      v-if="saveSuccess" 
      class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-2xs animate-fade-in"
    >
      <CheckCircle2 :size="18" class="text-emerald-600 shrink-0" />
      <span>تغییرات با موفقیت ذخیره شد و کاتالوگ عمومی شما به‌روزرسانی گردید.</span>
    </div>

    <!-- Error Alert -->
    <div 
      v-if="errorMessage" 
      class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-2xs animate-fade-in"
    >
      <AlertTriangle :size="18" class="text-rose-600 shrink-0" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Component 1: Showcase Link Card -->
    <ShowcaseLinkCard
      :catalog-url="getPublicCatalogUrl()"
      :on-copy="copyCatalogUrl"
    />

    <!-- Component 2: Contact Info Form (Phone is mandatory) -->
    <ShowcaseContactForm :profile="profile" />

    <!-- Component 3: Display & Order Preferences -->
    <ShowcasePreferencesCard :profile="profile" />

    <!-- Bottom Save Action Bar -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
      <button
        type="button"
        class="btn-gradient-primary text-sm !py-3 !px-7 flex items-center gap-2 cursor-pointer shadow-lg shadow-pink-500/20"
        :disabled="isSaving"
        @click="saveProfile"
      >
        <Save :size="16" />
        <span>{{ isSaving ? 'در حال ذخیره...' : 'ذخیره تنظیمات کاتالوگ' }}</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Save, CheckCircle2, AlertTriangle } from 'lucide-vue-next';
import { useShowcaseSettings } from './composables/useShowcaseSettings';
import ShowcaseLinkCard from './components/ShowcaseLinkCard.vue';
import ShowcaseContactForm from './components/ShowcaseContactForm.vue';
import ShowcasePreferencesCard from './components/ShowcasePreferencesCard.vue';

const {
  profile,
  isSaving,
  saveSuccess,
  errorMessage,
  getPublicCatalogUrl,
  copyCatalogUrl,
  saveProfile,
} = useShowcaseSettings();
</script>

