<template>
  <div 
    class="app-shell" 
    :class="{ 
      'sidebar-collapsed': isSidebarCollapsed,
      'is-landing': currentTab === 'landing'
    }"
  >
    <!-- Collapsible Side Menu across the platform (Hidden on Landing Page!) -->
    <SideMenu 
      v-if="currentTab !== 'landing'"
      :current-tab="currentTab" 
      @change-tab="setTab" 
    />

    <div class="app-layout-wrapper" :class="{ 'landing-wrapper': currentTab === 'landing' }">
      <!-- App Header for Dashboard (Hidden on Landing Page since Landing has its own Top Nav) -->
      <AppHeader 
        v-if="currentTab !== 'landing'"
        :current-tab="currentTab" 
        @change-tab="setTab" 
        @open-auth="openAuth('login')"
      />

      <main class="main-content" :class="{ 'landing-main': currentTab === 'landing' }">
        <LandingPageView 
          v-if="currentTab === 'landing'" 
          @navigate="setTab" 
          @open-auth="openAuth"
        />
        <WorkflowView 
          v-else-if="currentTab === 'workflow'" 
          @navigate="setTab" 
        />
        <CatalogBrowserView v-else-if="currentTab === 'catalog'" />
        <CategoryMapperView v-else-if="currentTab === 'category-mapper'" />
        <ExcelSyncView v-else-if="currentTab === 'sync'" />
        <SyncEngineView v-else-if="currentTab === 'sync-engine'" />
        <SuppliersJobsView v-else-if="currentTab === 'suppliers'" />
        <PublishingView v-else-if="currentTab === 'publishing'" />
        <TransformationsView v-else-if="currentTab === 'transformations'" />
      </main>

      <footer v-if="currentTab !== 'landing'" class="app-footer">
        <div class="footer-content">
          <div class="footer-left">
            <span class="footer-brand font-black text-slate-800">دفتر<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 font-black">َک</span></span>
            <span class="footer-dot">•</span>
            <span class="footer-tagline">{{ APP_CONFIG.taglineFa }}</span>
          </div>
          <div class="footer-right">
            <span class="version-badge">نسخه ۱.۰</span>
          </div>
        </div>
      </footer>

      <MobileNav 
        v-if="currentTab !== 'landing'"
        :current-tab="currentTab" 
        @change-tab="setTab" 
      />
    </div>

    <!-- Global Authentication Modal -->
    <AuthModal 
      v-if="showAuthModal" 
      :initial-mode="authModalMode"
      @close="showAuthModal = false"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { APP_CONFIG } from './config/branding';
import { useLayout } from './composables/useLayout';
import { useAuth } from './composables/useAuth';
import SideMenu from './components/layout/SideMenu.vue';
import AppHeader from './components/layout/AppHeader.vue';
import MobileNav from './components/layout/MobileNav.vue';
import AuthModal from './components/auth/AuthModal.vue';

// Views
import LandingPageView from './views/landing-page/LandingPageView.vue';
import WorkflowView from './views/workflow/WorkflowView.vue';
import CatalogBrowserView from './views/catalog-browser/CatalogBrowserView.vue';
import CategoryMapperView from './views/category-mapper/CategoryMapperView.vue';
import ExcelSyncView from './views/excel-sync/ExcelSyncView.vue';
import SyncEngineView from './views/sync-engine/SyncEngineView.vue';
import SuppliersJobsView from './views/suppliers-jobs/SuppliersJobsView.vue';
import PublishingView from './views/publishing/PublishingView.vue';
import TransformationsView from './views/transformations/TransformationsView.vue';

export type NavTab = 
  | 'landing' 
  | 'workflow'
  | 'catalog' 
  | 'category-mapper'
  | 'sync' 
  | 'sync-engine' 
  | 'suppliers' 
  | 'publishing' 
  | 'transformations';

const validTabs: NavTab[] = [
  'landing',
  'workflow',
  'catalog',
  'category-mapper',
  'sync',
  'sync-engine',
  'suppliers',
  'publishing',
  'transformations',
];

const { isAuthenticated, checkAuth } = useAuth();

const getHashTab = (): NavTab => {
  const hash = window.location.hash.replace('#', '') as NavTab;
  if (!validTabs.includes(hash)) return 'landing';
  if (hash !== 'landing' && !isAuthenticated.value) return 'landing';
  return hash;
};

const currentTab = ref<NavTab>(getHashTab());
const showAuthModal = ref<boolean>(false);
const authModalMode = ref<'login' | 'register'>('register');
const { isSidebarCollapsed } = useLayout();

function openAuth(mode: 'login' | 'register' = 'register') {
  authModalMode.value = mode;
  showAuthModal.value = true;
}

function setTab(tab: NavTab) {
  // Guard dashboard/internal tabs: straight go to dashboard is blocked until sign up
  if (tab !== 'landing' && !isAuthenticated.value) {
    openAuth('register');
    return;
  }
  currentTab.value = tab;
  window.location.hash = tab;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleAuthSuccess() {
  showAuthModal.value = false;
  // Transition directly into dashboard after successful signup/login
  currentTab.value = 'workflow';
  window.location.hash = 'workflow';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', () => {
  currentTab.value = getHashTab();
});

onMounted(() => {
  checkAuth();
});
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  position: relative;
  width: 100%;
}

.app-layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 74px; /* Space for mobile nav */
  transition: margin-right 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-layout-wrapper.landing-wrapper {
  margin-right: 0 !important;
  padding-bottom: 0 !important;
}

@media (min-width: 992px) {
  .app-layout-wrapper {
    padding-bottom: 0;
    margin-right: 270px; /* Space for expanded sidebar on RTL */
  }

  .sidebar-collapsed .app-layout-wrapper {
    margin-right: 80px; /* Space for collapsed sidebar on RTL */
  }

  .is-landing .app-layout-wrapper {
    margin-right: 0 !important;
  }
}

.main-content {
  flex: 1;
  padding: 24px;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
}

.main-content.landing-main {
  padding: 0;
  max-width: 100%;
}

.app-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.4);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-brand {
  font-weight: 700;
  color: var(--text-main);
}

.footer-dot {
  color: var(--text-muted);
}

.version-badge {
  background: var(--bg-hover);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-weight: 600;
  color: var(--text-secondary);
}
</style>
