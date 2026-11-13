import { ref } from 'vue';
import { API_BASE_URL } from '../config/api';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  date_joined?: string;
}

const STORAGE_KEY = 'vitrix_auth_user';

const getInitialUser = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const currentUser = ref<UserProfile | null>(getInitialUser());

const isAuthenticated = ref<boolean>(!!currentUser.value);
const isLoading = ref<boolean>(false);
const authError = ref<string | null>(null);

export function useAuth() {
  const clearError = () => {
    authError.value = null;
  };

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/core/auth/me/`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result?.is_authenticated && data.result?.user) {
          currentUser.value = data.result.user;
          isAuthenticated.value = true;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.result.user));
          return;
        }
      }
    } catch {
      // Graceful fallback if offline
    }
    // If not authenticated on server
    if (!localStorage.getItem(STORAGE_KEY)) {
      currentUser.value = null;
      isAuthenticated.value = false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    authError.value = null;
    try {
      const res = await fetch(`${API_BASE_URL}/api/core/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        authError.value = data.message || 'نام کاربری یا رمز عبور اشتباه است.';
        return false;
      }
      currentUser.value = data.result;
      isAuthenticated.value = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.result));
      return true;
    } catch {
      authError.value = 'خطا در برقراری ارتباط با سرور.';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (username: string, email: string, password: string, passwordConfirm: string): Promise<boolean> => {
    isLoading.value = true;
    authError.value = null;
    try {
      const res = await fetch(`${API_BASE_URL}/api/core/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorDetail = typeof data.result === 'object' 
          ? Object.values(data.result).flat().join(' ') 
          : data.message;
        authError.value = errorDetail || 'خطا در ثبت‌نام کاربر.';
        return false;
      }
      currentUser.value = data.result;
      isAuthenticated.value = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.result));
      return true;
    } catch {
      authError.value = 'خطا در برقراری ارتباط با سرور.';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    try {
      await fetch(`${API_BASE_URL}/api/core/auth/logout/`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Clear client state anyway
    } finally {
      currentUser.value = null;
      isAuthenticated.value = false;
      localStorage.removeItem(STORAGE_KEY);
      isLoading.value = false;
    }
  };

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    authError,
    clearError,
    login,
    register,
    logout,
    checkAuth,
  };
}
