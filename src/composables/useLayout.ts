import { ref, computed, watch } from 'vue';
import { APP_CONFIG } from '../config/branding';

export interface TenantInfo {
  id: string;
  name: string;
  tier: 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'syncing' | 'idle';
  productCount: number;
}

const SIDEBAR_COLLAPSED_KEY = 'daftarak_sidebar_collapsed';

const isSidebarCollapsed = ref<boolean>(
  localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
);

const isMobileMenuOpen = ref<boolean>(false);

const availableTenants = ref<TenantInfo[]>([
  {
    id: 'tenant-main',
    name: 'فروشگاه مرکزی دیجی‌استایل',
    tier: 'enterprise',
    status: 'active',
    productCount: 14850,
  },
  {
    id: 'tenant-sub',
    name: 'شعبه دوم تک‌شاپ الکترونیک',
    tier: 'pro',
    status: 'syncing',
    productCount: 3420,
  },
  {
    id: 'tenant-boutique',
    name: 'بوتیک مد و اکسسوری لایت',
    tier: 'starter',
    status: 'idle',
    productCount: 890,
  },
]);

const activeTenantId = ref<string>(
  localStorage.getItem(APP_CONFIG.tenantStorageKey) || 'tenant-main'
);

const currentTenant = computed(() => {
  return availableTenants.value.find(t => t.id === activeTenantId.value) || availableTenants.value[0];
});

watch(isSidebarCollapsed, (val) => {
  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(val));
});

watch(activeTenantId, (val) => {
  localStorage.setItem(APP_CONFIG.tenantStorageKey, val);
});

export function useLayout() {
  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  }

  function setSidebarCollapsed(collapsed: boolean) {
    isSidebarCollapsed.value = collapsed;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false;
  }

  function setActiveTenant(id: string) {
    activeTenantId.value = id;
  }

  return {
    isSidebarCollapsed,
    isMobileMenuOpen,
    availableTenants,
    activeTenantId,
    currentTenant,
    toggleSidebar,
    setSidebarCollapsed,
    toggleMobileMenu,
    closeMobileMenu,
    setActiveTenant,
  };
}
