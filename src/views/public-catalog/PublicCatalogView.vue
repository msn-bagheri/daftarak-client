<template>
  <div class="public-catalog-root min-h-screen bg-slate-50 flex flex-col select-text pb-20" dir="rtl">
    
    <!-- Top Header with Supplier Brand and Direct Call Button -->
    <CatalogHeader :profile="profile" />

    <!-- Horizontal Category Scroll Chips -->
    <CategoryPills
      :categories="categories"
      :selected-category="selectedCategory"
      :total-count="products.length"
      @select-category="selectedCategory = $event"
    />

    <!-- Main Content Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
      
      <!-- Instant Search & Filters Bar -->
      <CatalogFilters
        v-model:search-query="searchQuery"
        v-model:only-in-stock="onlyInStock"
        v-model:sort-by="sortBy"
      />

      <!-- Products Grid -->
      <div 
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
      >
        <CatalogProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :show-prices="profile.showPrices"
          :allow-inquiry-list="profile.allowInquiryList"
          :supplier-phone="profile.phone"
          @open-detail="openDetail"
          @add-to-inquiry="addToInquiry"
        />
      </div>

      <!-- Empty State -->
      <div 
        v-else 
        class="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8 shadow-2xs"
      >
        <PackageOpen :size="48" class="mx-auto text-slate-300 mb-3" />
        <h3 class="text-sm font-bold text-slate-700">هیچ کالایی با این مشخصات یافت نشد</h3>
        <p class="text-xs text-slate-400 mt-1">عنوان جستجو شده یا فیلتر دسته‌بندی را تغییر دهید.</p>
        <button
          type="button"
          class="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          @click="resetFilters"
        >
          پاک کردن فیلترها
        </button>
      </div>

    </main>

    <!-- Floating Bottom Order Bar (Active when items are in inquiry list) -->
    <div 
      v-if="profile.allowInquiryList && totalInquiryCount > 0"
      class="fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-40 bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl backdrop-blur-md border border-slate-800 flex items-center justify-between gap-3 animate-fade-in"
    >
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
          {{ formatNumberFa(totalInquiryCount) }}
        </div>
        <div>
          <div class="text-xs font-bold">لیست استعلام شما</div>
          <div v-if="profile.showPrices" class="text-[11px] text-slate-300">
            جمع: {{ formatNumberFa(totalInquiryPrice) }} تومان
          </div>
        </div>
      </div>

      <button
        type="button"
        class="py-2 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer select-none active:scale-95 transition-all"
        @click="isInquiryDrawerOpen = true"
      >
        <span>مشاهده و ارسال استعلام</span>
        <ArrowLeft :size="14" />
      </button>
    </div>

    <!-- Product Detail Bottom Sheet / Modal -->
    <ProductDetailModal
      v-if="isDetailModalOpen"
      :product="selectedProduct"
      :show-prices="profile.showPrices"
      :allow-inquiry-list="profile.allowInquiryList"
      :supplier-phone="profile.phone"
      @close="closeDetail"
      @add-to-inquiry="addToInquiry"
    />

    <!-- Order Inquiry Drawer -->
    <OrderInquiryDrawer
      :is-open="isInquiryDrawerOpen"
      :items="inquiryList"
      :total-count="totalInquiryCount"
      :total-price="totalInquiryPrice"
      :show-prices="profile.showPrices"
      :supplier-phone="profile.phone"
      :whatsapp-number="profile.whatsappNumber"
      :profile="profile"
      :generate-inquiry-text="generateInquiryText"
      @close="isInquiryDrawerOpen = false"
      @update-qty="updateInquiryQty"
      @remove-item="removeFromInquiry"
      @clear="clearInquiryList"
    />

    <!-- Public Showcase Footer -->
    <footer class="mt-auto border-t border-slate-200/70 py-6 text-center text-xs text-slate-400">
      <div class="flex items-center justify-center gap-1.5 mb-1.5">
        <span>ویترین دیجیتال و کاتالوگ همکار</span>
        <span>•</span>
        <span class="font-bold text-slate-600">{{ profile.name }}</span>
      </div>
      <p class="text-[11px] text-slate-400">قدرت‌گرفته از سامانه مدیریت کاتالوگ و توزیع دفترک</p>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, PackageOpen } from 'lucide-vue-next';
import { formatNumberFa } from '../../utils/formatters';
import { usePublicCatalog } from './composables/usePublicCatalog';
import CatalogHeader from './components/CatalogHeader.vue';
import CategoryPills from './components/CategoryPills.vue';
import CatalogFilters from './components/CatalogFilters.vue';
import CatalogProductCard from './components/CatalogProductCard.vue';
import ProductDetailModal from './components/ProductDetailModal.vue';
import OrderInquiryDrawer from './components/OrderInquiryDrawer.vue';

const {
  profile,
  products,
  categories,
  selectedCategory,
  searchQuery,
  onlyInStock,
  sortBy,
  filteredProducts,
  selectedProduct,
  isDetailModalOpen,
  inquiryList,
  isInquiryDrawerOpen,
  totalInquiryCount,
  totalInquiryPrice,
  openDetail,
  closeDetail,
  addToInquiry,
  updateInquiryQty,
  removeFromInquiry,
  clearInquiryList,
  generateInquiryText,
} = usePublicCatalog();

function resetFilters() {
  selectedCategory.value = 'all';
  searchQuery.value = '';
  onlyInStock.value = false;
  sortBy.value = 'newest';
}
</script>

<style scoped>
.public-catalog-root {
  font-family: 'Vazirmatn', system-ui, -apple-system, sans-serif !important;
}
</style>

