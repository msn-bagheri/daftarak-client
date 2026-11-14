import { ref, computed } from 'vue';

export type UserRole = 'merchant' | 'supplier';

const ROLE_STORAGE_KEY = 'daftarak_active_role';
const ONBOARDED_STORAGE_KEY = 'daftarak_role_onboarded';

const getInitialRole = (): UserRole => {
  const saved = localStorage.getItem(ROLE_STORAGE_KEY);
  if (saved === 'supplier' || saved === 'merchant') {
    return saved;
  }
  return 'merchant';
};

const getInitialOnboarded = (): boolean => {
  return localStorage.getItem(ONBOARDED_STORAGE_KEY) === 'true';
};

const currentRole = ref<UserRole>(getInitialRole());
const hasChosenRole = ref<boolean>(getInitialOnboarded());
const showRoleModal = ref<boolean>(false);

export function useUserRole() {
  const isMerchant = computed(() => currentRole.value === 'merchant');
  const isSupplier = computed(() => currentRole.value === 'supplier');

  const roleTitleFa = computed(() => {
    return isSupplier.value ? 'تأمین‌کننده و عمده‌فروش' : 'فروشگاه‌دار و خرده‌فروش';
  });

  const roleShortBadgeFa = computed(() => {
    return isSupplier.value ? 'تأمین‌کننده' : 'فروشگاه‌دار';
  });

  function setRole(role: UserRole) {
    currentRole.value = role;
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }

  function toggleRole(): UserRole {
    const nextRole: UserRole = currentRole.value === 'merchant' ? 'supplier' : 'merchant';
    setRole(nextRole);
    return nextRole;
  }

  function completeRoleOnboarding(role: UserRole) {
    setRole(role);
    hasChosenRole.value = true;
    localStorage.setItem(ONBOARDED_STORAGE_KEY, 'true');
    showRoleModal.value = false;
  }

  function openRoleModal() {
    showRoleModal.value = true;
  }

  function closeRoleModal() {
    showRoleModal.value = false;
  }

  return {
    currentRole,
    isMerchant,
    isSupplier,
    hasChosenRole,
    showRoleModal,
    roleTitleFa,
    roleShortBadgeFa,
    setRole,
    toggleRole,
    completeRoleOnboarding,
    openRoleModal,
    closeRoleModal,
  };
}

