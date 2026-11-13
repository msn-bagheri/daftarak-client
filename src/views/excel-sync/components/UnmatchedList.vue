<template>
  <div v-if="items.length > 0" class="unmatched-box glass">
    <div class="box-header">
      <span class="badge badge-danger">{{ items.length }} کالا</span>
      <h4>کالاهای یافت‌نشده در سایت</h4>
    </div>
    <p class="box-desc">این کالاها با هیچ محصولی در کاتالوگ شما (حتی با جستجوی فازی) تطبیق نیافتند:</p>
    <div class="items-chip-list">
      <div v-for="item in items" :key="item.row_number" class="unmatched-chip">
        <span class="row">#{{ item.row_number }}</span>
        <span>{{ item.excel_name || item.excel_sku }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnmatchedItem } from '../types';

defineProps<{
  items: UnmatchedItem[];
}>();
</script>

<style scoped>
.unmatched-box {
  margin-top: 24px;
  padding: 16px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.04);
}

.box-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.box-header h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--danger);
}

.box-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.items-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
}

.unmatched-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  background: #ffffff;
  border: 1px solid #fecdd3;
  font-size: 12px;
  color: var(--text-secondary);
}

.unmatched-chip .row {
  color: var(--danger);
  font-weight: 700;
}
</style>
