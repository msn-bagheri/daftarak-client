<template>
  <div class="product-mappings-list">
    <div class="list-top">
      <div>
        <h3 class="list-title">کالاهای منتشرشده در ووکامرس (Published WooCommerce Products)</h3>
        <p class="list-desc">پایش تطبیق کالاها، شناسه محصول در فروشگاه مقصد و وضعیت ارسال آخرین داده‌ها</p>
      </div>

      <button class="btn btn-primary" @click="$emit('open-publish-modal')">
        <Send :size="16" />
        <span>انتشار دستی محصول به ووکامرس</span>
      </button>
    </div>

    <div v-if="mappings.length === 0" class="empty-box glass">
      <CheckCircle2 :size="36" class="empty-icon" />
      <p>هنوز محصولی در سامانه انتشار مستقیم ثبت نشده است.</p>
      <button class="btn btn-outline-primary btn-sm" @click="$emit('open-publish-modal')">
        انتشار اولین محصول
      </button>
    </div>

    <div v-else class="mappings-table-wrap glass">
      <table class="mappings-table">
        <thead>
          <tr>
            <th>عنوان کالای منبع</th>
            <th>شناسه در ووکامرس (WC Product ID)</th>
            <th>نوع محصول</th>
            <th>وضعیت انتشار</th>
            <th>آخرین همگام‌سازی</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="map in mappings" :key="map.id" class="table-row">
            <td>
              <div class="product-info-cell">
                <strong class="prod-title">{{ map.source_product_name || `محصول #${map.source_product}` }}</strong>
                <span class="hash-tag font-mono">هش: {{ map.data_hash ? map.data_hash.slice(0, 10) : 'ندارد' }}</span>
              </div>
            </td>
            <td>
              <span class="id-badge">#{{ map.woo_product_id }}</span>
            </td>
            <td>
              <span class="badge badge-neutral">{{ map.woo_product_type || 'simple' }}</span>
            </td>
            <td>
              <span 
                class="badge" 
                :class="map.sync_status === 'synced' ? 'badge-success' : 'badge-danger'"
              >
                {{ map.sync_status === 'synced' ? 'همگام‌شده' : 'خطا در ارسال' }}
              </span>
              <div v-if="map.last_error" class="error-msg" :title="map.last_error">
                ⚠️ {{ map.last_error }}
              </div>
            </td>
            <td>
              <span class="sync-date">{{ formatDate(map.last_synced_at) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Send, CheckCircle2 } from 'lucide-vue-next';
import type { WooProductMapping } from '../types';

defineProps<{
  mappings: WooProductMapping[];
}>();

defineEmits<{
  (e: 'open-publish-modal'): void;
}>();

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('fa-IR');
}
</script>

<style scoped>
.product-mappings-list {
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

.mappings-table-wrap {
  border-radius: var(--radius-md);
  overflow-x: auto;
  border: 1px solid var(--border-subtle);
  background: #ffffff;
}

.mappings-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
  font-size: 13px;
}

.mappings-table th {
  padding: 12px 16px;
  background: #f8fafc;
  color: var(--text-secondary);
  font-weight: 700;
  border-bottom: 1px solid var(--border-subtle);
  white-space: nowrap;
}

.mappings-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}

.table-row:hover {
  background: #fcfdff;
}

.product-info-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.prod-title {
  color: var(--text-main);
  font-size: 13.5px;
}

.hash-tag {
  font-size: 11px;
  color: var(--text-muted);
}

.id-badge {
  font-family: monospace;
  font-weight: 700;
  color: var(--accent-primary);
  background: rgba(37, 99, 235, 0.08);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.error-msg {
  font-size: 11px;
  color: var(--danger);
  margin-top: 4px;
  max-width: 240px;
}

.sync-date {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
