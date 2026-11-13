<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
      <h3 class="text-base font-bold text-slate-900">
        آخرین تغییرات اعمال‌شده در سایت
      </h3>
      <span class="text-xs text-slate-500 font-medium">
        بروزرسانی لحظه‌ای
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-right text-sm">
        <thead class="bg-slate-50/75 border-b border-slate-200 text-xs font-bold text-slate-600">
          <tr>
            <th class="py-3 px-5">نام کالا</th>
            <th class="py-3 px-5">تغییر قیمت</th>
            <th class="py-3 px-5">زمان</th>
            <th class="py-3 px-5">وضعیت</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr 
            v-for="item in updates" 
            :key="item.id"
            class="hover:bg-slate-50/60 transition-colors"
          >
            <!-- Product Title + SKU -->
            <td class="py-3.5 px-5">
              <div class="font-bold text-slate-800">{{ item.productName }}</div>
              <div class="text-[11px] text-slate-400 font-mono">{{ item.sku }}</div>
            </td>

            <!-- Price Old -> New -->
            <td class="py-3.5 px-5 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <span class="line-through text-slate-400 text-xs">
                  {{ formatNumberFa(item.oldPrice) }}
                </span>
                <span class="text-slate-400 text-xs">➔</span>
                <span class="font-bold text-emerald-600">
                  {{ formatNumberFa(item.newPrice) }} تومان
                </span>
              </div>
            </td>

            <!-- Time -->
            <td class="py-3.5 px-5 text-slate-500 text-xs whitespace-nowrap">
              {{ item.timeAgo }}
            </td>

            <!-- Status -->
            <td class="py-3.5 px-5 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80">
                <Check :size="12" />
                <span>{{ item.channelStatus }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { RecentUpdateItem } from '../types';

defineProps<{
  updates: RecentUpdateItem[];
}>();
</script>

