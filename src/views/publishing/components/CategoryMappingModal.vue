<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card glass animate-fade-in">
      <div class="modal-header">
        <h3 class="modal-title">
          {{ mapping.id ? 'ویرایش نگاشت دسته‌بندی' : 'ثبت نگاشت دسته‌بندی جدید' }}
        </h3>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <form class="modal-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">دسته‌بندی داخلی کاتالوگ (Internal Category):</label>
          <select v-model="form.internal_category" class="form-select">
            <option :value="null">-- انتخاب نشده --</option>
            <option v-for="cat in internalCategories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">یا دسته‌بندی منبع تأمین‌کننده (Source Category):</label>
          <select v-model="form.source_category" class="form-select">
            <option :value="null">-- انتخاب نشده --</option>
            <option v-for="cat in sourceCategories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">شناسه دسته‌بندی در ووکامرس (Woo Category ID):</label>
          <input 
            v-model="form.woo_category_id" 
            type="text" 
            placeholder="مثال: 142" 
            class="form-input font-mono" 
          />
        </div>

        <div class="form-group">
          <label class="form-label">نام یا عنوان نمایشی دسته در سایت مقصد:</label>
          <input 
            v-model="form.woo_category_name" 
            type="text" 
            placeholder="مثال: لوازم جانبی موبایل" 
            class="form-input" 
            required 
          />
        </div>

        <div class="checkbox-row">
          <label class="checkbox-label">
            <input v-model="form.allow_out_of_stock" type="checkbox" />
            <span>اجازه به ورود و انتشار کالاهای ناموجود در این دسته</span>
          </label>
        </div>

        <div class="checkbox-row">
          <label class="checkbox-label">
            <input v-model="form.enabled" type="checkbox" />
            <span>فعال‌بودن نگاشت</span>
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-outline" @click="$emit('close')">انصراف</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'در حال ثبت...' : 'ذخیره نگاشت' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CategoryMapping, SourceCategoryOption, InternalCategoryOption } from '../types';

const props = defineProps<{
  mapping: Partial<CategoryMapping>;
  sourceCategories: SourceCategoryOption[];
  internalCategories: InternalCategoryOption[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', payload: Partial<CategoryMapping>): Promise<void>;
}>();

const isSubmitting = ref(false);
const form = ref<Partial<CategoryMapping>>({
  internal_category: props.mapping.internal_category || null,
  source_category: props.mapping.source_category || null,
  woo_category_id: props.mapping.woo_category_id || '',
  woo_category_name: props.mapping.woo_category_name || '',
  allow_out_of_stock: props.mapping.allow_out_of_stock ?? false,
  enabled: props.mapping.enabled ?? true,
  id: props.mapping.id,
});

async function handleSubmit() {
  if (!form.value.woo_category_name) return;
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
  max-height: 90vh;
  overflow-y: auto;
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
