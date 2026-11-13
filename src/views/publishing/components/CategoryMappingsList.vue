<template>
  <div class="category-mappings-list">
    <div class="list-top">
      <div>
        <h3 class="list-title">نگاشت دسته‌بندی‌ها به ووکامرس (Category Mappings)</h3>
        <p class="list-desc">اتصال خودکار دسته‌بندی‌های کاتالوگ داخلی یا تأمین‌کننده به شناسه‌های دسته در سایت ووکامرس</p>
      </div>

      <button class="btn btn-primary" @click="$emit('open-create')">
        <Plus :size="16" />
        <span>نگاشت دسته‌بندی جدید</span>
      </button>
    </div>

    <div v-if="mappings.length === 0" class="empty-box glass">
      <FolderTree :size="36" class="empty-icon" />
      <p>هیچ نگاشت دسته‌بندی ثبت نشده است.</p>
      <button class="btn btn-outline-primary btn-sm" @click="$emit('open-create')">
        ثبت اولین نگاشت
      </button>
    </div>

    <div v-else class="mappings-table-wrap glass">
      <table class="mappings-table">
        <thead>
          <tr>
            <th>دسته‌بندی مبدأ (داخلی / تأمین‌کننده)</th>
            <th>شناسه دسته در ووکامرس (ID)</th>
            <th>عنوان دسته در ووکامرس</th>
            <th>مجوز کالای ناموجود</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="map in mappings" :key="map.id" class="table-row">
            <td>
              <div class="category-source-cell">
                <strong class="cat-name">{{ map.internal_category_name || map.source_category_name || 'دسته‌بندی عمومی' }}</strong>
                <span class="cat-type">{{ map.internal_category_name ? 'کاتالوگ داخلی' : 'منبع تأمین‌کننده' }}</span>
              </div>
            </td>
            <td>
              <span class="id-badge">#{{ map.woo_category_id || 'Auto' }}</span>
            </td>
            <td>
              <span class="target-name text-gradient">{{ map.woo_category_name || '-' }}</span>
            </td>
            <td>
              <span class="badge" :class="map.allow_out_of_stock ? 'badge-warning' : 'badge-neutral'">
                {{ map.allow_out_of_stock ? 'مجاز به ورود' : 'فقط کالای موجود' }}
              </span>
            </td>
            <td>
              <span class="badge" :class="map.enabled ? 'badge-success' : 'badge-neutral'">
                {{ map.enabled ? 'فعال' : 'غیرفعال' }}
              </span>
            </td>
            <td>
              <div class="row-actions">
                <button class="btn btn-outline btn-xs" @click="$emit('edit', map)">
                  ویرایش
                </button>
                <button class="btn btn-outline btn-xs text-danger" @click="$emit('delete', map.id)">
                  حذف
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderTree, Plus } from 'lucide-vue-next';
import type { CategoryMapping } from '../types';

defineProps<{
  mappings: CategoryMapping[];
}>();

defineEmits<{
  (e: 'open-create'): void;
  (e: 'edit', mapping: CategoryMapping): void;
  (e: 'delete', id: string): void;
}>();
</script>

<style scoped>
.category-mappings-list {
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

.category-source-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cat-name {
  color: var(--text-main);
  font-size: 13.5px;
}

.cat-type {
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

.target-name {
  font-weight: 700;
}

.row-actions {
  display: flex;
  gap: 6px;
}

.btn-xs {
  min-height: 28px;
  padding: 2px 10px;
  font-size: 11.5px;
}

.text-danger {
  color: var(--danger);
}
</style>
