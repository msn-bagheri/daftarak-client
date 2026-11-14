<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    
    <!-- Stat 1: Total Orders -->
    <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <ClipboardList :size="20" />
      </div>
      <div>
        <div class="text-[11px] font-bold text-slate-500">کل سفارش‌های دریافتی</div>
        <div class="text-lg font-black text-slate-900 mt-0.5">
          {{ formatNumberFa(stats.totalOrders) }} <span class="text-xs font-normal text-slate-400">سفارش</span>
        </div>
      </div>
    </div>

    <!-- Stat 2: Pending Review -->
    <div class="bg-white rounded-2xl border border-amber-200/90 bg-amber-50/20 p-4 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
        <Clock :size="20" />
      </div>
      <div>
        <div class="text-[11px] font-bold text-amber-700">در انتظار بررسی شرایط</div>
        <div class="text-lg font-black text-amber-900 mt-0.5">
          {{ formatNumberFa(stats.pendingCount) }} <span class="text-xs font-normal text-amber-600">مورد نیاز به تأیید</span>
        </div>
      </div>
    </div>

    <!-- Stat 3: Processing / In Prep -->
    <div class="bg-white rounded-2xl border border-indigo-200/90 bg-indigo-50/20 p-4 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
        <PackageCheck :size="20" />
      </div>
      <div>
        <div class="text-[11px] font-bold text-indigo-700">در حال آماده‌سازی و باربری</div>
        <div class="text-lg font-black text-indigo-900 mt-0.5">
          {{ formatNumberFa(stats.processingCount + stats.shippedCount) }} <span class="text-xs font-normal text-indigo-600">سفارش فعال</span>
        </div>
      </div>
    </div>

    <!-- Stat 4: Total Volume -->
    <div class="bg-white rounded-2xl border border-emerald-200/90 bg-emerald-50/20 p-4 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
        <Coins :size="20" />
      </div>
      <div>
        <div class="text-[11px] font-bold text-emerald-700">گردش پیش‌فاکتورها</div>
        <div class="text-lg font-black text-emerald-900 mt-0.5">
          {{ formatNumberFa(stats.totalVolume) }} <span class="text-xs font-normal text-emerald-600">تومان</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ClipboardList, Clock, PackageCheck, Coins } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { OrderStats } from '../types';

defineProps<{
  stats: OrderStats;
}>();
</script>

