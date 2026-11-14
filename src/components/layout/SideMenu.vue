<template>
  <div>
    <!-- Mobile Backdrop -->
    <div 
      v-if="isMobileMenuOpen" 
      class="sidebar-mobile-backdrop"
      @click="closeMobileMenu"
    />

    <!-- Main Sidebar Container -->
    <aside 
      class="side-menu glass"
      :class="{
        'is-collapsed': isSidebarCollapsed,
        'mobile-open': isMobileMenuOpen,
      }"
      aria-label="منوی اصلی سامانه"
    >
      <!-- Brand & Header -->
      <!-- Brand & Header -->
      <div v-if="!isSidebarCollapsed" class="sidebar-header">
        <DaftarakLogo 
          size="md" 
          variant="horizontal" 
          show-badge 
          badge-text="نسخه ابری" 
          show-subtitle 
          tagline="پلتفرم کاتالوگ و انبار" 
          clickable 
          @click="navigateTo('workflow')" 
        />

        <!-- Desktop Collapse Button -->
        <button 
          type="button"
          class="toggle-collapse-btn desktop-only"
          title="جمع کردن منو"
          aria-label="جمع کردن منو"
          @click="toggleSidebar"
        >
          <PanelRightClose :size="18" />
        </button>

        <!-- Mobile Close Button -->
        <button 
          type="button"
          class="toggle-collapse-btn mobile-only"
          aria-label="بستن منو"
          @click="closeMobileMenu"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Collapsed Header (Centered & Clean) -->
      <div v-else class="sidebar-header collapsed-header">
        <button 
          type="button"
          class="collapsed-brand-btn desktop-only"
          title="گسترش منوی ناوبری"
          aria-label="گسترش منوی ناوبری"
          @click="toggleSidebar"
        >
          <DaftarakLogo size="sm" variant="icon-only" />
          <span class="mini-expand-indicator">
            <PanelRightOpen :size="11" />
          </span>
        </button>
      </div>

      <!-- Single Store Scope Status Card -->
      <div class="sidebar-tenant-section">
        <div v-if="!isSidebarCollapsed" class="tenant-expanded-box">
          <div class="tenant-top-row">
            <span class="tenant-heading">فروشگاه متصل</span>
            <span class="pulse-indicator" title="ارتباط زنده با ووکامرس">
              <span class="pulse-circle"></span>
              <span class="pulse-text">متصل</span>
            </span>
          </div>
          <div class="tenant-single-store-display" @click="navigateTo('sync-engine')">
            <Store :size="16" class="text-blue-600 shrink-0" />
            <span class="tenant-store-name truncate">{{ activeStoreName }}</span>
          </div>
        </div>

        <!-- Collapsed Store Mini Icon -->
        <button 
          v-else 
          type="button"
          class="tenant-mini-pill"
          :title="`فروشگاه من: ${activeStoreName}`"
          @click="navigateTo('sync-engine')"
        >
          <Store :size="18" class="text-blue" />
          <span class="tenant-mini-dot"></span>
        </button>
      </div>

      <!-- Navigation Links List -->
      <nav class="sidebar-nav">
        <div v-if="!isSidebarCollapsed" class="nav-section-label">
          <span>مراحل گام‌به‌گام راه‌اندازی</span>
        </div>

        <ul class="nav-list">
          <li 
            v-for="item in stepItems" 
            :key="item.tab"
            class="nav-item"
          >
            <button 
              type="button"
              class="nav-btn"
              :class="{ 'is-active': currentTab === item.tab }"
              :title="isSidebarCollapsed ? item.label : undefined"
              @click="navigateTo(item.tab)"
            >
              <div class="nav-icon-wrap" :class="`icon-theme-${item.color}`">
                <component :is="item.icon" :size="18" />
              </div>

              <div v-show="!isSidebarCollapsed" class="nav-label-group">
                <span class="nav-title">{{ item.label }}</span>
                <span class="nav-desc">{{ item.description }}</span>
              </div>

              <span 
                v-if="!isSidebarCollapsed && item.badge" 
                class="badge nav-badge"
                :class="item.badgeClass || 'badge-neutral'"
              >
                {{ item.badge }}
              </span>

              <!-- Active highlight bar -->
              <span v-if="currentTab === item.tab" class="active-indicator-bar"></span>
            </button>

            <!-- Collapsed Floating Flyout Tooltip -->
            <div v-if="isSidebarCollapsed" class="collapsed-nav-tooltip desktop-only">
              <span class="tooltip-title">{{ item.label }}</span>
              <span class="tooltip-desc">{{ item.description }}</span>
            </div>
          </li>
        </ul>

        <div v-if="!isSidebarCollapsed" class="nav-section-label mt-4">
          <span>پایش و ابزارها</span>
        </div>

        <ul class="nav-list">
          <li 
            v-for="item in generalItems" 
            :key="item.tab"
            class="nav-item"
          >
            <button 
              type="button"
              class="nav-btn"
              :class="{ 'is-active': currentTab === item.tab }"
              :title="isSidebarCollapsed ? item.label : undefined"
              @click="navigateTo(item.tab)"
            >
              <div class="nav-icon-wrap" :class="`icon-theme-${item.color}`">
                <component :is="item.icon" :size="18" />
              </div>

              <div v-show="!isSidebarCollapsed" class="nav-label-group">
                <span class="nav-title">{{ item.label }}</span>
                <span class="nav-desc">{{ item.description }}</span>
              </div>

              <span 
                v-if="!isSidebarCollapsed && item.badge" 
                class="badge nav-badge"
                :class="item.badgeClass || 'badge-neutral'"
              >
                {{ item.badge }}
              </span>

              <!-- Active highlight bar -->
              <span v-if="currentTab === item.tab" class="active-indicator-bar"></span>
            </button>

            <!-- Collapsed Floating Flyout Tooltip -->
            <div v-if="isSidebarCollapsed" class="collapsed-nav-tooltip desktop-only">
              <span class="tooltip-title">{{ item.label }}</span>
              <span class="tooltip-desc">{{ item.description }}</span>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer / System Status -->
      <div class="sidebar-footer">
        <div v-if="!isSidebarCollapsed" class="system-status-card">
          <div class="status-card-header">
            <div class="status-ping">
              <span class="ping-wave"></span>
              <span class="ping-point"></span>
            </div>
            <span class="status-card-title">وضعیت هماهنگی</span>
          </div>
          <div class="status-stats-grid">
            <div class="mini-stat">
              <span class="stat-caption">سرعت اعمال</span>
              <span class="stat-val text-green">آنی</span>
            </div>
            <div class="mini-stat">
              <span class="stat-caption">وضعیت سرور</span>
              <span class="stat-val text-green">پایدار</span>
            </div>
          </div>
        </div>

        <!-- Quick Collapse Bar for Footer -->
        <button 
          v-if="!isSidebarCollapsed"
          type="button"
          class="sidebar-quick-toggle desktop-only"
          @click="toggleSidebar"
        >
          <PanelRightClose :size="15" />
          <span>جمع کردن پنل ناوبری</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DaftarakLogo from '../brand/DaftarakLogo.vue';
import {
  FileSpreadsheet,
  Package,
  Calculator,
  PanelRightClose,
  PanelRightOpen,
  X,
  LayoutDashboard,
  FolderTree,
  Store,
  Truck,
} from 'lucide-vue-next';
import { useLayout } from '../../composables/useLayout';
import type { NavTab } from '../../App.vue';

interface NavMenuItem {
  tab: NavTab;
  label: string;
  description: string;
  icon: any;
  color: 'blue' | 'pink' | 'purple' | 'green' | 'amber';
  badge?: string;
  badgeClass?: string;
}

const props = defineProps<{
  currentTab: NavTab;
}>();

const emit = defineEmits<{
  (e: 'change-tab', tab: NavTab): void;
}>();

const {
  isSidebarCollapsed,
  isMobileMenuOpen,
  availableTenants,
  activeTenantId,
  toggleSidebar,
  closeMobileMenu,
} = useLayout();

const stepItems: NavMenuItem[] = [
  {
    tab: 'sync-engine',
    label: '۱. اتصال و سینک فروشگاه',
    description: 'ووکامرس یا دیجی‌کالای مقصد',
    icon: Store,
    color: 'blue',
  },
  {
    tab: 'suppliers',
    label: '۲. اتصال تأمین‌کنندگان',
    description: 'معرفی سایت‌های عمده‌فروشی',
    icon: Truck,
    color: 'purple',
  },
  {
    tab: 'category-mapper',
    label: '۳. تطبیق دسته‌بندی‌ها',
    description: 'متصل کردن دسته‌های کالا',
    icon: FolderTree,
    color: 'amber',
  },
  {
    tab: 'transformations',
    label: '۴. فرمول سود و قیمت',
    description: 'درصد سود و رندسازی تومان',
    icon: Calculator,
    color: 'pink',
  },
  {
    tab: 'catalog',
    label: '۵. انبار و انتشار کالاها',
    description: 'بررسی قیمت نهایی و انتشار',
    icon: Package,
    color: 'green',
  },
];

const generalItems: NavMenuItem[] = [
  {
    tab: 'workflow',
    label: 'میز کار و وضعیت زنده',
    description: 'پایش تغییرات و گزارش سیستم',
    icon: LayoutDashboard,
    color: 'blue',
  },
  {
    tab: 'sync',
    label: 'آپدیت با اکسل',
    description: 'بارگذاری فایل اکسل عمده‌فروش',
    icon: FileSpreadsheet,
    color: 'green',
  },
];

const currentTenant = computed(() => {
  return availableTenants.value.find(t => t.id === activeTenantId.value) || availableTenants.value[0];
});

const activeStoreName = computed(() => {
  return currentTenant.value ? currentTenant.value.name : 'فروشگاه ووکامرس من';
});

function navigateTo(tab: NavTab) {
  emit('change-tab', tab);
  closeMobileMenu();
}
</script>

<style scoped>
/* Mobile Backdrop */
.sidebar-mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 90;
  transition: opacity 0.3s ease;
}

/* Sidebar Host */
.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 270px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.04);
  overflow-x: hidden;
}

/* Desktop Collapsed State */
@media (min-width: 992px) {
  .side-menu.is-collapsed {
    width: 76px;
  }
}

/* Mobile Off-canvas Drawer */
@media (max-width: 991px) {
  .side-menu {
    transform: translateX(100%);
    width: 280px;
    box-shadow: -10px 0 30px rgba(15, 23, 42, 0.15);
  }

  .side-menu.mobile-open {
    transform: translateX(0);
  }
}

/* Header */
.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.collapsed-header {
  padding: 0 10px;
  justify-content: center;
}

.collapsed-brand-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4px;
}

.mini-avatar {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.collapsed-brand-btn:hover .mini-avatar {
  transform: scale(1.06);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
}

.mini-expand-indicator {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.collapsed-brand-btn:hover .mini-expand-indicator {
  background: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
  transform: scale(1.15);
}

.brand-area {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  min-width: 0;
}

.brand-avatar {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 50%, #ec4899 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.brand-sparkle {
  color: #ffffff;
}

.brand-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-title {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-main);
  letter-spacing: -0.3px;
}

.tier-pill {
  font-size: 9px;
  padding: 1px 5px;
  font-weight: 700;
}

.brand-sub {
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}

.toggle-collapse-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toggle-collapse-btn:hover {
  background: #f1f5f9;
  color: var(--accent-primary);
  border-color: #e2e8f0;
}

.desktop-only {
  display: none;
}

.mobile-only {
  display: flex;
}

@media (min-width: 992px) {
  .desktop-only {
    display: flex;
  }
  .mobile-only {
    display: none;
  }
}

/* Tenant Section */
.sidebar-tenant-section {
  padding: 12px 14px 6px;
  flex-shrink: 0;
}

.tenant-expanded-box {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(236, 72, 153, 0.04) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-md);
  padding: 10px 12px;
}

.tenant-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.tenant-heading {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
}

.pulse-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  color: var(--success);
  font-weight: 700;
}

.pulse-circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
}

.tenant-select-container {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-sm);
  padding: 4px 8px;
}

.tenant-single-store-display {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tenant-single-store-display:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.tenant-store-name {
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
}

.tenant-box-icon {
  color: var(--accent-primary);
  flex-shrink: 0;
}

.tenant-native-select {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-main);
  outline: none;
  width: 100%;
  cursor: pointer;
}

.tenant-mini-pill {
  width: 44px;
  height: 44px;
  margin: 0 auto;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tenant-mini-pill:hover {
  border-color: var(--accent-primary);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}

.tenant-mini-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
}

/* Nav Area */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 10px 10px;
}

.nav-section-label {
  padding: 4px 10px 8px;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  position: relative;
}

.side-menu.is-collapsed .nav-btn {
  justify-content: center;
  padding: 8px 0;
}

.collapsed-nav-tooltip {
  position: absolute;
  top: 50%;
  right: calc(100% + 12px);
  transform: translateY(-50%) translateX(6px);
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 120;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-align: right;
}

.collapsed-nav-tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  border-width: 5px 0 5px 5px;
  border-style: solid;
  border-color: transparent transparent transparent rgba(15, 23, 42, 0.94);
}

.nav-item:hover .collapsed-nav-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0);
}

.tooltip-title {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}

.tooltip-desc {
  font-size: 10px;
  color: #94a3b8;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: right;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-height: 44px;
}

.nav-btn:hover {
  background: rgba(37, 99, 235, 0.05);
  color: var(--text-main);
  border-color: rgba(37, 99, 235, 0.1);
}

.nav-btn.is-active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.09) 0%, rgba(236, 72, 153, 0.09) 100%);
  border-color: rgba(37, 99, 235, 0.25);
  color: var(--accent-primary);
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
}

.active-indicator-bar {
  position: absolute;
  top: 8px;
  bottom: 8px;
  right: 0;
  width: 3.5px;
  border-radius: 4px 0 0 4px;
  background: linear-gradient(180deg, #2563eb 0%, #ec4899 100%);
}

.nav-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.nav-btn:hover .nav-icon-wrap {
  transform: scale(1.08);
}

.icon-theme-blue {
  background: rgba(37, 99, 235, 0.08);
  color: var(--accent-primary);
}

.icon-theme-pink {
  background: rgba(236, 72, 153, 0.08);
  color: var(--accent-pink);
}

.icon-theme-purple {
  background: rgba(139, 92, 246, 0.08);
  color: #7c3aed;
}

.icon-theme-green {
  background: rgba(16, 185, 129, 0.08);
  color: var(--success);
}

.icon-theme-amber {
  background: rgba(245, 158, 11, 0.08);
  color: #d97706;
}

.nav-label-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.nav-title {
  font-size: 13px;
  line-height: 1.3;
}

.nav-desc {
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-badge {
  font-size: 10px;
  padding: 1px 6px;
  flex-shrink: 0;
}

/* Footer Card */
.sidebar-footer {
  padding: 12px 14px 16px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}

.system-status-card {
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  box-shadow: var(--shadow-sm);
}

.status-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.status-ping {
  position: relative;
  width: 10px;
  height: 10px;
}

.ping-point {
  position: absolute;
  inset: 1px;
  border-radius: 50%;
  background: var(--success);
}

.ping-wave {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.35);
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.status-card-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
}

.status-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.mini-stat {
  display: flex;
  flex-direction: column;
}

.stat-caption {
  font-size: 9.5px;
  color: var(--text-muted);
}

.stat-val {
  font-size: 11px;
  font-weight: 800;
  color: var(--text-main);
  font-family: monospace;
}

.sidebar-quick-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 7px 12px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-quick-toggle:hover {
  background: #f1f5f9;
  color: var(--accent-primary);
  border-color: #cbd5e1;
}

.text-blue { color: var(--accent-primary); }
.text-green { color: var(--success); }
</style>
