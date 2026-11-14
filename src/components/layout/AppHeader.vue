<template>
  <header class="app-header glass">
    <div class="header-content">
      <div class="header-start">
        <button 
          type="button" 
          class="sidebar-trigger-btn"
          :title="isSidebarCollapsed ? 'گسترش منوی کناری' : 'جمع کردن منوی کناری'"
          :aria-label="isSidebarCollapsed ? 'گسترش منوی کناری' : 'جمع کردن منوی کناری'"
          @click="handleMenuToggle"
        >
          <Menu :size="19" />
        </button>

        <DaftarakLogo 
          size="sm" 
          variant="horizontal" 
          clickable
          @click="$emit('change-tab', 'workflow')" 
        />

        <!-- Active Module Context Pill -->
        <div class="active-module-pill">
          <span class="module-dot"></span>
          <span class="module-title">{{ currentModuleMeta.title }}</span>
          <span class="badge badge-primary module-badge">{{ currentModuleMeta.badge }}</span>
        </div>
      </div>

      <div class="header-actions">
        <!-- Connected Store Badge -->
        <div class="tenant-scope-pill" :title="`فروشگاه متصل: ${currentTenant.name}`">
          <Store :size="14" class="text-blue" />
          <span class="tenant-scope-name">{{ currentTenant.name }}</span>
        </div>

        <!-- User Profile & Auth Status -->
        <div class="user-auth-pill">
          <div v-if="isAuthenticated && currentUser" class="user-info-row" :title="`کاربر فعال: ${currentUser.username}`">
            <User :size="14" class="text-pink" />
            <span class="user-name">{{ currentUser.username }}</span>
            <button 
              type="button" 
              class="header-logout-btn" 
              title="خروج از حساب کاربری"
              @click="handleLogout"
            >
              <LogOut :size="13" />
            </button>
          </div>
          <button 
            v-else 
            type="button" 
            class="btn btn-outline-primary btn-xs"
            @click="$emit('open-auth')"
          >
            ورود / ثبت‌نام
          </button>
        </div>

        <!-- Server Connection Status -->
        <div class="status-indicator">
          <span class="pulse-dot"></span>
          <span class="status-text">متصل به سرور</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Menu, Store, User, LogOut } from 'lucide-vue-next';
import DaftarakLogo from '../brand/DaftarakLogo.vue';
import { useLayout } from '../../composables/useLayout';
import { useAuth } from '../../composables/useAuth';
import type { NavTab } from '../../App.vue';

const props = defineProps<{
  currentTab: NavTab;
}>();

const emit = defineEmits<{
  (e: 'change-tab', tab: NavTab): void;
  (e: 'open-auth'): void;
}>();

const { isSidebarCollapsed, currentTenant, toggleSidebar, toggleMobileMenu } = useLayout();
const { currentUser, isAuthenticated, logout } = useAuth();

const moduleMetaMap: Record<NavTab, { title: string; badge: string }> = {
  landing: { title: 'معرفی سامانه', badge: 'صفحه اصلی' },
  workflow: { title: 'میز کار', badge: 'وضعیت' },
  catalog: { title: 'لیست کالاها', badge: 'کالاها' },
  'category-mapper': { title: 'دسته‌بندی‌ها', badge: 'تطبیق' },
  sync: { title: 'آپدیت با اکسل', badge: 'اکسل' },
  'sync-engine': { title: 'اتصال فروشگاه‌ها', badge: 'فروشگاه‌ها' },
  suppliers: { title: 'تأمین‌کنندگان', badge: 'عمده‌فروش' },
  publishing: { title: 'انتشار کالاها', badge: 'ارسال' },
  transformations: { title: 'فرمول قیمت و سود', badge: 'سود و قیمت' },
};

const currentModuleMeta = computed(() => {
  return moduleMetaMap[props.currentTab] || moduleMetaMap.landing;
});

function handleMenuToggle() {
  if (window.innerWidth < 992) {
    toggleMobileMenu();
  } else {
    toggleSidebar();
  }
}

async function handleLogout() {
  await logout();
  emit('change-tab', 'landing');
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.header-content {
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header-start {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.sidebar-trigger-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: rgba(37, 99, 235, 0.06);
  border: 1px solid rgba(37, 99, 235, 0.15);
  color: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.sidebar-trigger-btn:hover {
  background: rgba(37, 99, 235, 0.12);
  color: var(--accent-hover);
  border-color: var(--accent-primary);
  transform: scale(1.04);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}

.brand-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #2563eb 0%, #ec4899 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.22);
}

.brand-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-title {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-main);
  line-height: 1.2;
}

.brand-badge {
  font-size: 9px;
  padding: 1px 5px;
}

.brand-tagline {
  font-size: 10px;
  color: var(--text-muted);
  display: none;
}

@media (min-width: 1200px) {
  .brand-tagline {
    display: block;
  }
}

.active-module-pill {
  display: none;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
}

@media (min-width: 768px) {
  .active-module-pill {
    display: inline-flex;
  }
}

.module-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
}

.module-badge {
  font-size: 9.5px;
  padding: 1px 5px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.tenant-scope-pill {
  display: none;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-secondary);
}

@media (min-width: 1024px) {
  .tenant-scope-pill {
    display: inline-flex;
  }
}

.tenant-scope-name {
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: var(--radius-full);
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
}

.status-text {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--success);
  display: none;
}

@media (min-width: 640px) {
  .status-text {
    display: inline;
  }
}

.text-blue {
  color: var(--accent-primary);
}

.user-auth-pill {
  display: flex;
  align-items: center;
}

.user-info-row {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
}

.user-name {
  font-weight: 700;
  color: var(--text-main);
  display: none;
}

@media (min-width: 640px) {
  .user-name {
    display: inline;
  }
}

.header-logout-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-muted, #94a3b8);
  padding: 2px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.header-logout-btn:hover {
  color: #f43f5e;
}
</style>
