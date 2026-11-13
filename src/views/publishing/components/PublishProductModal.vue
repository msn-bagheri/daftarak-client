<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card glass animate-fade-in">
      <div class="modal-header">
        <h3 class="modal-title">انتشار مستقیم کالا به ووکامرس</h3>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <form class="modal-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">انتخاب محصول کاتالوگ:</label>
          <select v-model="selectedProductId" class="form-select" required>
            <option value="" disabled>-- انتخاب محصول کاتالوگ --</option>
            <option v-for="prod in products" :key="prod.id" :value="prod.id">
              {{ prod.name }} ({{ prod.sku || 'بدون SKU' }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">فروشگاه ووکامرس مقصد:</label>
          <select v-model="selectedConfigId" class="form-select" required>
            <option value="" disabled>-- انتخاب فروشگاه ووکامرس --</option>
            <option v-for="cfg in configs" :key="cfg.id" :value="cfg.id">
              {{ cfg.store_name }} ({{ cfg.base_url }})
            </option>
          </select>
        </div>

        <div class="info-note">
          ℹ️ سیستم اطلاعات کالا، ویژگی‌ها، تصاویر و قیمت محاسبه‌شده را مستقیماً به API ووکامرس ارسال کرده و شناسه محصول را جهت مراجعات بعدی ذخیره می‌کند.
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-outline" @click="$emit('close')">انصراف</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting || !selectedProductId || !selectedConfigId">
            {{ isSubmitting ? 'در حال انتشار کالا...' : 'ارسال و انتشار محصول' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { WooCommerceConfig, ProductOption } from '../types';

const props = defineProps<{
  configs: WooCommerceConfig[];
  products: ProductOption[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'publish', payload: { productId: string; configId: string }): Promise<void>;
}>();

const isSubmitting = ref(false);
const selectedProductId = ref(props.products.length > 0 ? props.products[0].id : '');
const selectedConfigId = ref(props.configs.length > 0 ? props.configs[0].id : '');

async function handleSubmit() {
  if (!selectedProductId.value || !selectedConfigId.value) return;
  isSubmitting.value = true;
  try {
    await emit('publish', {
      productId: selectedProductId.value,
      configId: selectedConfigId.value,
    });
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

.info-note {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}
</style>
