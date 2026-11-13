<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card glass animate-fade-in">
      <div class="modal-header">
        <h3 class="modal-title">
          {{ config.id ? 'ویرایش اتصال فروشگاه ووکامرس' : 'اتصال فروشگاه ووکامرس جدید' }}
        </h3>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <form class="modal-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">نام یا عنوان فروشگاه:</label>
          <input 
            v-model="form.store_name" 
            type="text" 
            placeholder="مثال: فروشگاه اصلی تهران" 
            class="form-input" 
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label">آدرس سایت ووکامرس (Base URL):</label>
          <input 
            v-model="form.base_url" 
            type="url" 
            placeholder="https://myshop.ir" 
            class="form-input" 
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label">کلید مصرف‌کننده (Consumer Key):</label>
          <input 
            v-model="form.consumer_key" 
            type="text" 
            placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
            class="form-input font-mono" 
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label">رمز محرمانه مصرف‌کننده (Consumer Secret):</label>
          <input 
            v-model="form.consumer_secret" 
            type="password" 
            placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
            class="form-input font-mono" 
            required 
          />
        </div>

        <div class="checkbox-row">
          <label class="checkbox-label">
            <input v-model="form.enabled" type="checkbox" />
            <span>فعال‌بودن ارسال و همگام‌سازی مستقیم به این فروشگاه</span>
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-outline" @click="$emit('close')">انصراف</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'در حال ثبت...' : 'ذخیره فروشگاه' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { WooCommerceConfig } from '../types';

const props = defineProps<{
  config: Partial<WooCommerceConfig>;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', payload: Partial<WooCommerceConfig>): Promise<void>;
}>();

const isSubmitting = ref(false);
const form = ref<Partial<WooCommerceConfig>>({
  store_name: props.config.store_name || '',
  base_url: props.config.base_url || '',
  consumer_key: props.config.consumer_key || '',
  consumer_secret: props.config.consumer_secret || '',
  enabled: props.config.enabled ?? true,
  id: props.config.id,
});

async function handleSubmit() {
  if (!form.value.store_name || !form.value.base_url) return;
  isSubmitting.value = true;
  try {
    await emit('save', { ...form.value });
    emit('close');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-card {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-main);
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-muted);
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.font-mono {
  font-family: monospace;
}

.checkbox-row {
  margin: 4px 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}
</style>
