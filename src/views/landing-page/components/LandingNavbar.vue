<template>
  <header class="sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl bg-white/85 border-b border-slate-200/80 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Logo & Brand Badge -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-pink-500/20">
          <Zap :size="22" class="text-white fill-white" />
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-xl text-slate-900 tracking-tight">دفترک</span>
            <span class="text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-pink-50 text-blue-700 border border-blue-200/70 font-semibold">
              همگام‌ساز هوشمند
            </span>
          </div>
          <span class="text-[11px] text-slate-400 font-medium">هماهنگی خودکار ووکامرس</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#features" class="hover:text-blue-600 transition-colors">قابلیت‌ها</a>
        <a href="#channels" class="hover:text-blue-600 transition-colors">کانال‌های متصل</a>
        <a href="#why-daftarak" class="hover:text-blue-600 transition-colors">چرا دفترک؟</a>
        <a href="#cta" class="hover:text-pink-600 transition-colors font-semibold">آزمایش رایگان</a>
      </nav>

      <!-- Action Section: Logged-in Dropdown OR Guest Auth Buttons -->
      <div class="flex items-center gap-3">
        <!-- State A: Authenticated User with Dropdown -->
        <div v-if="isAuthenticated && currentUser" ref="userMenuRef" class="relative">
          <div class="flex items-center gap-2">
            <!-- Quick Button: ورود به میز کار -->
            <button
              type="button"
              class="btn-gradient-primary text-xs !py-2.5 !px-4 cursor-pointer hidden sm:inline-flex items-center gap-1.5 shadow-md shadow-pink-500/15"
              @click="$emit('navigate', 'workflow')"
            >
              <LayoutDashboard :size="15" />
              <span>ورود به میز کار</span>
              <ArrowLeft :size="14" />
            </button>

            <!-- User Badge Dropdown Button -->
            <button
              type="button"
              class="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-800 text-xs font-bold shadow-2xs cursor-pointer select-none"
              :class="{ 'border-blue-400 ring-2 ring-blue-500/10': isDropdownOpen }"
              @click="toggleDropdown"
            >
              <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <User :size="15" />
              </div>
              <span class="max-w-[120px] truncate">{{ currentUser.username }}</span>
              <ChevronDown 
                :size="14" 
                class="text-slate-400 transition-transform duration-200" 
                :class="{ 'rotate-180': isDropdownOpen }" 
              />
            </button>
          </div>

          <!-- Dropdown Card -->
          <transition name="dropdown-fade">
            <div 
              v-if="isDropdownOpen" 
              class="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-right animate-fade-in"
            >
              <div class="px-3 py-2 border-b border-slate-100 mb-1">
                <div class="text-[11px] text-slate-400 font-medium">حساب کاربری فعال</div>
                <div class="text-xs font-bold text-slate-800 truncate">{{ currentUser.username }}</div>
                <div v-if="currentUser.email" class="text-[10px] text-slate-400 font-mono truncate" dir="ltr">
                  {{ currentUser.email }}
                </div>
              </div>

              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer text-right"
                @click="goToDashboard"
              >
                <LayoutDashboard :size="15" class="text-blue-600 shrink-0" />
                <span>ورود به میز کار (داشبورد)</span>
              </button>

              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-xs font-bold text-slate-700 hover:text-rose-600 transition-colors cursor-pointer text-right"
                @click="handleLogout"
              >
                <LogOut :size="15" class="text-rose-500 shrink-0" />
                <span>خروج از حساب کاربری</span>
              </button>
            </div>
          </transition>
        </div>

        <!-- State B: Guest User Buttons -->
        <template v-else>
          <button
            type="button"
            class="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-all cursor-pointer"
            @click="$emit('open-auth', 'login')"
          >
            ورود به پنل
          </button>

          <button
            type="button"
            class="btn-gradient-primary text-sm !py-2.5 !px-5 cursor-pointer"
            @click="$emit('open-auth', 'register')"
          >
            <span>شروع رایگان</span>
            <ArrowLeft :size="16" />
          </button>
        </template>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  Zap,
  ArrowLeft,
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from 'lucide-vue-next';
import { useAuth } from '../../../composables/useAuth';
import type { NavTab } from '../types';

const emit = defineEmits<{
  (e: 'navigate', tab: NavTab): void;
  (e: 'open-auth', mode?: 'login' | 'register'): void;
}>();

const { currentUser, isAuthenticated, logout } = useAuth();

const isDropdownOpen = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function goToDashboard() {
  isDropdownOpen.value = false;
  emit('navigate', 'workflow');
}

async function handleLogout() {
  isDropdownOpen.value = false;
  await logout();
}

function handleClickOutside(event: MouseEvent) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
