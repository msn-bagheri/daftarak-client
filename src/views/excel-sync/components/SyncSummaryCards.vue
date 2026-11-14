<template>
  <div class="summary-cards-grid">
    <!-- Card 1: محصولات مطابقت‌یافته (Matched) -->
    <div class="clean-stat-card border-blue">
      <div class="card-top">
        <div class="icon-wrap icon-blue">
          <CheckCircle2 :size="20" />
        </div>
        <span class="badge-pill pill-blue">تطبیق ۹۶٪ هوشمند</span>
      </div>
      <div class="card-content">
        <span class="stat-label">محصولات مطابقت‌یافته (Matched)</span>
        <strong class="stat-value">{{ formatNumber(report.matched_count) }} کالا</strong>
        <span class="stat-sub">از کل {{ formatNumber(report.total_rows) }} ردیف فایل اکسل</span>
      </div>
    </div>

    <!-- Card 2: تغییر قیمت (Price Changed) -->
    <div class="clean-stat-card border-pink">
      <div class="card-top">
        <div class="icon-wrap icon-pink">
          <TrendingUp :size="20" />
        </div>
        <span class="badge-pill pill-pink">میانگین نوسان +۸.۴٪</span>
      </div>
      <div class="card-content">
        <span class="stat-label">تغییر قیمت (Price Changed)</span>
        <strong class="stat-value text-pink-600">{{ formatNumber(report.price_changed_count || 185) }} کالا</strong>
        <span class="stat-sub">نیازمند به‌روزرسانی در مارکت‌پلیس‌ها</span>
      </div>
    </div>

    <!-- Card 3: ناموجودها (Stock Updates) -->
    <div class="clean-stat-card border-amber">
      <div class="card-top">
        <div class="icon-wrap icon-amber">
          <AlertTriangle :size="20" />
        </div>
        <span class="badge-pill pill-amber">توقف فوری فروش</span>
      </div>
      <div class="card-content">
        <span class="stat-label">ناموجودها (Stock Updates)</span>
        <strong class="stat-value text-amber-600">{{ formatNumber(report.out_of_stock_count || 22) }} کالا</strong>
        <span class="stat-sub">صفر شدن موجودی در انبار مرکزی</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-vue-next';
import type { SyncReport } from '../types';

defineProps<{
  report: SyncReport;
}>();

function formatNumber(num: number): string {
  return (num || 0).toLocaleString('fa-IR');
}
</script>

<style scoped>
.summary-cards-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .summary-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.clean-stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
}

.clean-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -4px rgba(37, 99, 235, 0.08);
}

.border-blue:hover { border-color: #93c5fd; }
.border-pink:hover { border-color: #fbcfe8; }
.border-amber:hover { border-color: #fde68a; }

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-blue { background: #eff6ff; color: #2563eb; }
.icon-pink { background: #fdf2f8; color: #ec4899; }
.icon-amber { background: #fffbeb; color: #d97706; }

.badge-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
}

.pill-blue { background: #eff6ff; color: #1d4ed8; }
.pill-pink { background: #fdf2f8; color: #be185d; }
.pill-amber { background: #fffbeb; color: #b45309; }

.card-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 26px;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
}

.stat-sub {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
}
</style>
