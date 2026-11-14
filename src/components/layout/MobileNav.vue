<template>
  <nav class="mobile-nav glass">
    <div class="nav-scroller">
      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'sync-engine' }"
        @click="$emit('change-tab', 'sync-engine')"
      >
        <Store :size="16" />
        <span>۱. اتصال فروشگاه</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'suppliers' }"
        @click="$emit('change-tab', 'suppliers')"
      >
        <Truck :size="16" />
        <span>۲. تأمین‌کنندگان</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'category-mapper' }"
        @click="$emit('change-tab', 'category-mapper')"
      >
        <FolderTree :size="16" />
        <span>۳. دسته‌بندی‌ها</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'transformations' }"
        @click="$emit('change-tab', 'transformations')"
      >
        <Calculator :size="16" />
        <span>۴. فرمول سود</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'catalog' }"
        @click="$emit('change-tab', 'catalog')"
      >
        <Package :size="16" />
        <span>۵. انبار کالاها</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'showcase-settings' }"
        @click="$emit('change-tab', 'showcase-settings')"
      >
        <Globe :size="16" />
        <span>ویترین من</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'workflow' }"
        @click="$emit('change-tab', 'workflow')"
      >
        <LayoutDashboard :size="16" />
        <span>میز کار</span>
      </button>

      <button 
        type="button"
        class="nav-tab" 
        :class="{ active: currentTab === 'sync' }"
        @click="$emit('change-tab', 'sync')"
      >
        <FileSpreadsheet :size="16" />
        <span>آپدیت اکسل</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  FileSpreadsheet,
  Package,
  Calculator,
  LayoutDashboard,
  FolderTree,
  Store,
  Truck,
  Globe,
} from 'lucide-vue-next';
import type { NavTab } from '../../App.vue';

defineProps<{
  currentTab: NavTab;
}>();

defineEmits<{
  (e: 'change-tab', tab: NavTab): void;
}>();
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--border-subtle);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);
}

.nav-scroller {
  display: flex;
  overflow-x: auto;
  padding: 6px 8px;
  padding-bottom: max(6px, env(safe-area-inset-bottom));
  gap: 4px;
  -webkit-overflow-scrolling: touch;
}

.nav-tab {
  flex: 0 0 auto;
  min-width: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 4px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-tab.active {
  color: var(--accent-primary);
  background: rgba(37, 99, 235, 0.08);
  font-weight: 700;
}

@media (min-width: 992px) {
  .mobile-nav {
    display: none;
  }
}
</style>
