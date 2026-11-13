<template>
  <div class="woo-configs-list">
    <div class="list-top">
      <div>
        <h3 class="list-title">فروشگاه‌های مقصد ووکامرس (WooCommerce Destinations)</h3>
        <p class="list-desc">پیکربندی کلیدهای REST API، کنترل اعتبارسنجی اتصال و تنظیمات همگام‌سازی فروشگاه‌ها</p>
      </div>

      <button class="btn btn-primary" @click="$emit('open-create')">
        <Plus :size="16" />
        <span>اتصال فروشگاه جدید</span>
      </button>
    </div>

    <div v-if="configs.length === 0" class="empty-box glass">
      <Store :size="36" class="empty-icon" />
      <p>هیچ فروشگاه ووکامرسی متصل نشده است.</p>
      <button class="btn btn-outline-primary btn-sm" @click="$emit('open-create')">
        اتصال اولین فروشگاه
      </button>
    </div>

    <div v-else class="configs-grid">
      <div 
        v-for="cfg in configs" 
        :key="cfg.id" 
        class="config-card glass-card animate-fade-in"
      >
        <div class="card-head">
          <div class="store-info">
            <div class="store-avatar">
              <Store :size="20" />
            </div>
            <div>
              <h4 class="store-name">{{ cfg.store_name }}</h4>
              <span class="store-url">{{ cfg.base_url }}</span>
            </div>
          </div>

          <span class="badge" :class="cfg.enabled ? 'badge-success' : 'badge-neutral'">
            {{ cfg.enabled ? 'فعال' : 'غیرفعال' }}
          </span>
        </div>

        <div class="keys-info">
          <div class="key-item">
            <span class="key-label">Consumer Key:</span>
            <span class="key-val font-mono">{{ maskKey(cfg.consumer_key) }}</span>
          </div>

          <div v-if="connectionReports[cfg.id]" class="status-box">
            <span class="status-title">گزارش اتصال:</span>
            <span 
              class="badge" 
              :class="connectionReports[cfg.id].status === 'ok' ? 'badge-success' : 'badge-danger'"
            >
              {{ connectionReports[cfg.id].status === 'ok' ? 'ارتباط برقرار است' : 'خطای اتصال' }}
            </span>
            <p v-if="connectionReports[cfg.id].error" class="error-msg">
              {{ connectionReports[cfg.id].error }}
            </p>
          </div>
        </div>

        <div class="card-actions">
          <button 
            class="btn btn-outline-primary btn-xs"
            :disabled="isTestingConnection[cfg.id]"
            @click="$emit('test-connection', cfg.id)"
          >
            <Zap :size="13" :class="{ 'spin-icon': isTestingConnection[cfg.id] }" />
            <span>{{ isTestingConnection[cfg.id] ? 'در حال بررسی...' : 'بررسی اتصال زنده' }}</span>
          </button>

          <div class="sub-actions">
            <button class="btn btn-outline btn-xs" @click="$emit('edit', cfg)">
              ویرایش
            </button>
            <button class="btn btn-outline btn-xs text-danger" @click="$emit('delete', cfg.id)">
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Store, Plus, Zap } from 'lucide-vue-next';
import type { WooCommerceConfig, ConnectionReport } from '../types';

defineProps<{
  configs: WooCommerceConfig[];
  connectionReports: Record<string, ConnectionReport>;
  isTestingConnection: Record<string, boolean>;
}>();

defineEmits<{
  (e: 'open-create'): void;
  (e: 'edit', cfg: WooCommerceConfig): void;
  (e: 'delete', id: string): void;
  (e: 'test-connection', id: string): void;
}>();

function maskKey(key: string): string {
  if (!key) return '-';
  if (key.length <= 10) return '********';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}
</script>

<style scoped>
.woo-configs-list {
  margin-top: 10px;
}

.list-top {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

@media (min-width: 640px) {
  .list-top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.list-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
}

.list-desc {
  font-size: 13px;
  color: var(--text-muted);
}

.empty-box {
  padding: 48px 24px;
  text-align: center;
  border-radius: var(--radius-lg);
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon {
  color: var(--accent-pink);
  opacity: 0.6;
}

.configs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .configs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.config-card {
  padding: 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.store-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.store-avatar {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: rgba(37, 99, 235, 0.1);
  color: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.store-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-main);
}

.store-url {
  font-size: 11.5px;
  color: var(--text-muted);
  direction: ltr;
  display: block;
}

.keys-info {
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12.5px;
  margin-bottom: 16px;
}

.key-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.key-label {
  color: var(--text-muted);
}

.key-val {
  color: var(--text-secondary);
  font-family: monospace;
}

.status-box {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed #cbd5e1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.status-title {
  font-size: 11px;
  color: var(--text-muted);
}

.error-msg {
  font-size: 11px;
  color: var(--danger);
  width: 100%;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}

.sub-actions {
  display: flex;
  gap: 6px;
}

.btn-xs {
  min-height: 30px;
  padding: 3px 10px;
  font-size: 12px;
}

.text-danger {
  color: var(--danger);
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
