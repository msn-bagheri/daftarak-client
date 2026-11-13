<template>
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" 
    dir="rtl"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden p-6 sm:p-8 relative">
      <!-- Close Button -->
      <button 
        type="button" 
        class="absolute top-5 left-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="بستن"
        @click="$emit('close')"
      >
        <X :size="16" />
      </button>

      <!-- Brand Icon & Header -->
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
          <Sparkles :size="22" />
        </div>
        <h2 class="text-xl font-black text-slate-900 tracking-tight">
          {{ mode === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب کاربری جدید' }}
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          {{ mode === 'login' ? 'برای مدیریت کالاها و همگام‌سازی فروشگاه وارد شوید' : 'در کمتر از ۲ دقیقه ثبت‌نام کرده و فروشگاه خود را متصل کنید' }}
        </p>
      </div>

      <!-- Mode Switcher Tabs -->
      <div class="flex items-center p-1 bg-slate-100 rounded-xl mb-6">
        <button 
          type="button" 
          class="flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center"
          :class="mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'"
          @click="switchMode('login')"
        >
          ورود
        </button>
        <button 
          type="button" 
          class="flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center"
          :class="mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'"
          @click="switchMode('register')"
        >
          ثبت‌نام
        </button>
      </div>

      <!-- Error Message Banner -->
      <div 
        v-if="authError" 
        class="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 mb-5 animate-fade-in"
      >
        <AlertCircle :size="16" class="shrink-0" />
        <span class="leading-relaxed">{{ authError }}</span>
      </div>

      <!-- Login Form -->
      <form v-if="mode === 'login'" class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            نام کاربری
          </label>
          <div class="relative">
            <User :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              v-model="loginUsername" 
              type="text" 
              class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="نام کاربری خود را وارد کنید" 
              required 
              autocomplete="username"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            رمز عبور
          </label>
          <div class="relative">
            <Lock :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              v-model="loginPassword" 
              :type="showPassword ? 'text' : 'password'" 
              class="w-full pr-10 pl-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
              placeholder="رمز عبور خود را وارد کنید" 
              required 
              autocomplete="current-password"
            />
            <button 
              type="button" 
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" :size="16" />
              <Eye v-else :size="16" />
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>{{ isLoading ? 'در حال بررسی...' : 'ورود به حساب' }}</span>
        </button>
      </form>

      <!-- Register Form -->
      <form v-else class="space-y-4" @submit.prevent="handleRegister">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            نام کاربری
          </label>
          <div class="relative">
            <User :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              v-model="regUsername" 
              type="text" 
              class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="یک نام کاربری انتخاب کنید (مثلاً shop_tehran)" 
              required 
              autocomplete="username"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            ایمیل <span class="text-slate-400 font-normal">(جهت بازیابی رمز عبور - اختیاری)</span>
          </label>
          <div class="relative">
            <Mail :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              v-model="regEmail" 
              type="email" 
              class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="you@example.com" 
              autocomplete="email"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            رمز عبور
          </label>
          <div class="relative">
            <Lock :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              v-model="regPassword" 
              :type="showPassword ? 'text' : 'password'" 
              class="w-full pr-10 pl-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
              placeholder="حداقل ۶ کاراکتر" 
              required 
              autocomplete="new-password"
            />
            <button 
              type="button" 
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" :size="16" />
              <Eye v-else :size="16" />
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            تکرار رمز عبور
          </label>
          <div class="relative">
            <Lock :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              v-model="regPasswordConfirm" 
              :type="showPassword ? 'text' : 'password'" 
              class="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
              placeholder="رمز عبور را مجدداً وارد کنید" 
              required 
              autocomplete="new-password"
            />
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>{{ isLoading ? 'در حال ایجاد حساب...' : 'ثبت‌نام و ورود به پنل' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  X,
  Sparkles,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-vue-next';
import { useAuth } from '../../composables/useAuth';

const props = withDefaults(defineProps<{
  initialMode?: 'login' | 'register';
}>(), {
  initialMode: 'register',
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const { login, register, isLoading, authError, clearError } = useAuth();

const mode = ref<'login' | 'register'>(props.initialMode);
const showPassword = ref(false);

const loginUsername = ref('');
const loginPassword = ref('');

const regUsername = ref('');
const regEmail = ref('');
const regPassword = ref('');
const regPasswordConfirm = ref('');

function switchMode(newMode: 'login' | 'register') {
  mode.value = newMode;
  clearError();
}

async function handleLogin() {
  const success = await login(loginUsername.value, loginPassword.value);
  if (success) {
    emit('success');
    emit('close');
  }
}

async function handleRegister() {
  if (regPassword.value !== regPasswordConfirm.value) {
    authError.value = 'رمز عبور با تکرار آن یکسان نیست.';
    return;
  }
  const success = await register(
    regUsername.value,
    regEmail.value,
    regPassword.value,
    regPasswordConfirm.value
  );
  if (success) {
    emit('success');
    emit('close');
  }
}
</script>
