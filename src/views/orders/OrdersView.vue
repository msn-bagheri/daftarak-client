<template>
  <div class="orders-view max-w-6xl mx-auto space-y-6">
    
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
      <div>
        <div class="flex items-center gap-2.5">
          <ClipboardList :size="24" class="text-blue-600" />
          <h1 class="text-xl font-black text-slate-900">سفارش‌ها و پیش‌فاکتورهای همکاران</h1>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
            B2B
          </span>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          مدیریت سفارش‌های ثبت‌شده از کاتالوگ دیجیتال همکاران، بررسی شرایط تسویه (نسیه، چک، نقد) و هماهنگی باربری
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <OrderStats :stats="stats" />

    <!-- Filters & Search -->
    <OrderFilters
      v-model:selectedStatus="selectedStatus"
      v-model:searchQuery="searchQuery"
      :stats="stats"
    />

    <!-- Orders List -->
    <div v-if="filteredOrders.length > 0" class="space-y-3.5">
      <OrderCard
        v-for="order in filteredOrders"
        :key="order.id"
        :order="order"
        @update-status="updateOrderStatus"
        @open-detail="openDetail"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-2xs">
      <Inbox :size="54" class="mx-auto text-slate-300 mb-3" />
      <h3 class="text-sm font-black text-slate-800">هیچ سفارشی با این مشخصات یافت نشد</h3>
      <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
        می‌توانید فیلتر وضعیت یا عبارت جستجو را تغییر دهید تا سفارش‌های دیگر نمایش داده شوند.
      </p>
    </div>

    <!-- Detail Modal -->
    <OrderDetailModal
      :is-open="isDetailOpen"
      :order="selectedOrder"
      @close="closeDetail"
      @update-status="updateOrderStatus"
    />

  </div>
</template>

<script setup lang="ts">
import { ClipboardList, Inbox } from 'lucide-vue-next';
import { useOrders } from './composables/useOrders';
import OrderStats from './components/OrderStats.vue';
import OrderFilters from './components/OrderFilters.vue';
import OrderCard from './components/OrderCard.vue';
import OrderDetailModal from './components/OrderDetailModal.vue';

const {
  selectedStatus,
  searchQuery,
  filteredOrders,
  stats,
  selectedOrder,
  isDetailOpen,
  updateOrderStatus,
  openDetail,
  closeDetail,
} = useOrders();
</script>

