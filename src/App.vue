<template>
  <div 
    class="app-shell" 
    :class="{ 
      'sidebar-collapsed': isSidebarCollapsed,
      'is-landing': isPublicView
    }"
  >
    <!-- Collapsible Side Menu across the platform (Hidden on Landing Page and Public Catalog!) -->
    <SideMenu 
      v-if="!isPublicView"
      :current-tab="currentTab" 
      @change-tab="setTab" 
    />

    <div class="app-layout-wrapper" :class="{ 'landing-wrapper': isPublicView }">
      <!-- App Header for Dashboard (Hidden on Landing & Public Catalog) -->
      <AppHeader 
        v-if="!isPublicView"
        :current-tab="currentTab" 
        @change-tab="setTab" 
        @open-auth="openAuth('login')"
        @role-changed="handleHeaderRoleChanged"
      />

      <main class="main-content" :class="{ 'landing-main': isPublicView }">
        <LandingPageView 
          v-if="currentTab === 'landing'" 
          @navigate="setTab" 
          @open-auth="openAuth"
        />
        <PublicCatalogView 
          v-else-if="currentTab === 'public-catalog'" 
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
        <ShowcaseSettingsView v-else-if="currentTab === 'showcase-settings'" />
      </main>

      <footer v-if="!isPublicView" class="app-footer">
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
        v-if="!isPublicView"
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

    <!-- Role Onboarding Modal (First time persona selection) -->
    <RoleOnboardingModal
      v-if="showRoleModal"
      :initial-role="currentRole"
      @complete="handleRoleOnboardingComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { APP_CONFIG } from './config/branding';
import { useLayout } from './composables/useLayout';
import { useAuth } from './composables/useAuth';
import SideMenu from './components/layout/SideMenu.vue';
import AppHeader from './components/layout/AppHeader.vue';
import MobileNav from './components/layout/MobileNav.vue';
import AuthModal from './components/auth/AuthModal.vue';
import RoleOnboardingModal from './components/auth/RoleOnboardingModal.vue';
import { useUserRole, type UserRole } from './composables/useUserRole';

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
import PublicCatalogView from './views/public-catalog/PublicCatalogView.vue';
import ShowcaseSettingsView from './views/showcase-settings/ShowcaseSettingsView.vue';

export type NavTab = 
  | 'landing' 
  | 'workflow'
  | 'catalog' 
  | 'category-mapper'
  | 'sync' 
  | 'sync-engine' 
  | 'suppliers' 
  | 'publishing' 
  | 'transformations'
  | 'public-catalog'
  | 'showcase-settings';

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
  'public-catalog',
  'showcase-settings',
];

const { isAuthenticated, checkAuth } = useAuth();

const getHashTab = (): NavTab => {
  const hash = window.location.hash.replace('#', '') as NavTab;
  if (!validTabs.includes(hash)) return 'landing';
  if (hash === 'landing' || hash === 'public-catalog') return hash;
  if (!isAuthenticated.value) return 'landing';
  return hash;
};

const currentTab = ref<NavTab>(getHashTab());
const isPublicView = computed(() => currentTab.value === 'landing' || currentTab.value === 'public-catalog');
const showAuthModal = ref<boolean>(false);
const authModalMode = ref<'login' | 'register'>('register');
const { isSidebarCollapsed } = useLayout();
const { currentRole, hasChosenRole, showRoleModal, completeRoleOnboarding, openRoleModal } = useUserRole();

function openAuth(mode: 'login' | 'register' = 'register') {
  authModalMode.value = mode;
  showAuthModal.value = true;
}

function setTab(tab: NavTab) {
  // Guard dashboard/internal tabs: straight go to dashboard is blocked until sign up
  if (tab !== 'landing' && tab !== 'public-catalog' && !isAuthenticated.value) {
    openAuth('register');
    return;
  }
  currentTab.value = tab;
  window.location.hash = tab;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleAuthSuccess() {
  showAuthModal.value = false;
  // If user hasn't completed 1-step persona onboarding, show friendly role welcome modal
  if (!hasChosenRole.value) {
    openRoleModal();
  } else {
    // Navigate based on their role
    if (currentRole.value === 'supplier') {
      setTab('showcase-settings');
    } else {
      setTab('workflow');
    }
  }
}

function handleRoleOnboardingComplete(role: UserRole) {
  completeRoleOnboarding(role);
  if (role === 'supplier') {
    setTab('showcase-settings');
  } else {
    setTab('workflow');
  }
}

function handleHeaderRoleChanged(newRole: UserRole) {
  if (newRole === 'supplier') {
    const merchantTabs: NavTab[] = ['sync-engine', 'suppliers', 'category-mapper', 'transformations', 'publishing'];
    if (merchantTabs.includes(currentTab.value)) {
      setTab('showcase-settings');
    }
  } else {
    if (currentTab.value === 'showcase-settings') {
      setTab('workflow');
    }
  }
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
