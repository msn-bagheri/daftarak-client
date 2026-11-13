<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" dir="rtl">
    <!-- View Top Header (Max 2-3 words, no verbose subheadings) -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">
        تأمین‌کنندگان
      </h1>

      <button 
        type="button" 
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        @click="isAddSupplierModalOpen = true"
      >
        <Plus :size="15" />
        <span>افزودن سایت تأمین‌کننده (ووکامرس)</span>
      </button>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div 
        v-if="toastMessage" 
        class="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2"
      >
        <CheckCircle2 :size="16" class="text-emerald-400" />
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Supplier Cards (e.g. هیسکا / پرنسلی) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SupplierCard 
        v-for="sup in suppliers" 
        :key="sup.id" 
        :supplier="sup" 
        @update="triggerManualUpdate" 
        @manage-categories="openManageCategories"
      />
    </div>

    <!-- Activity History (Log Table replacing stack traces) -->
    <ActivityHistoryTable :logs="activityLogs" />

    <!-- Add Supplier Modal -->
    <AddSupplierModal 
      v-if="isAddSupplierModalOpen" 
      @close="isAddSupplierModalOpen = false" 
      @save="addSupplier" 
    />

    <!-- Supplier Categories Filter Modal -->
    <SupplierCategoriesModal 
      v-if="activeSupplierForCategories"
      :supplier="activeSupplierForCategories"
      :categories="supplierCategoriesMap[activeSupplierForCategories.id] || []"
      @close="activeSupplierForCategories = null"
      @save="saveSupplierCategories"
    />
  </div>
</template>

<script setup lang="ts">
import { Plus, CheckCircle2 } from 'lucide-vue-next';
import { useSuppliersJobs } from './composables/useSuppliersJobs';
import SupplierCard from './components/SupplierCard.vue';
import ActivityHistoryTable from './components/ActivityHistoryTable.vue';
import AddSupplierModal from './components/AddSupplierModal.vue';
import SupplierCategoriesModal from './components/SupplierCategoriesModal.vue';

const {
  suppliers,
  activityLogs,
  toastMessage,
  isAddSupplierModalOpen,
  activeSupplierForCategories,
  supplierCategoriesMap,
  triggerManualUpdate,
  addSupplier,
  openManageCategories,
  saveSupplierCategories,
} = useSuppliersJobs();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
