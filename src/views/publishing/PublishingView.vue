<template>
  <div class="publishing-view animate-fade-in">
    <!-- View Header -->
    <div class="view-header">
      <div>
        <h2 class="view-title">انتشار و یکپارچه‌سازی ووکامرس (WooCommerce Publishing)</h2>
        <p class="view-desc">
          مدیریت اتصال‌های REST API فروشگاه‌های مقصد، نگاشت دسته‌بندی‌ها و انتشار مستقیم محصولات کاتالوگ
        </p>
      </div>

      <button class="btn btn-outline" :disabled="isLoading" @click="loadAll">
        <RefreshCw :size="15" :class="{ 'spin-icon': isLoading }" />
        <span>به‌روزرسانی داده‌ها</span>
      </button>
    </div>

    <!-- Alerts -->
    <div v-if="errorMessage" class="alert alert-danger glass">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success glass">
      {{ successMessage }}
    </div>

    <!-- Sub Navigation Tabs -->
    <div class="sub-nav-tabs">
      <button 
        class="sub-tab-btn" 
        :class="{ active: activeSubTab === 'configs' }"
        @click="activeSubTab = 'configs'"
      >
        <Store :size="16" />
        <span>فروشگاه‌های مقصد ({{ configs.length }})</span>
      </button>

      <button 
        class="sub-tab-btn" 
        :class="{ active: activeSubTab === 'categories' }"
        @click="activeSubTab = 'categories'"
      >
        <FolderTree :size="16" />
        <span>نگاشت دسته‌بندی‌ها ({{ categoryMappings.length }})</span>
      </button>

      <button 
        class="sub-tab-btn" 
        :class="{ active: activeSubTab === 'mappings' }"
        @click="activeSubTab = 'mappings'"
      >
        <CheckCircle2 :size="16" />
        <span>کالاهای منتشرشده ({{ productMappings.length }})</span>
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="sub-tab-content">
      <WooConfigsList 
        v-if="activeSubTab === 'configs'"
        :configs="configs"
        :connection-reports="connectionReports"
        :is-testing-connection="isTestingConnection"
        @open-create="openCreateConfig"
        @edit="openEditConfig"
        @delete="deleteConfig"
        @test-connection="checkConnection"
      />

      <CategoryMappingsList 
        v-else-if="activeSubTab === 'categories'"
        :mappings="categoryMappings"
        @open-create="openCreateCategoryMapping"
        @edit="openEditCategoryMapping"
        @delete="deleteCategoryMapping"
      />

      <WooProductMappingsList 
        v-else-if="activeSubTab === 'mappings'"
        :mappings="productMappings"
        @open-publish-modal="showPublishModal = true"
      />
    </div>

    <!-- Modals -->
    <WooConfigModal 
      v-if="showConfigModal"
      :config="editingConfig"
      @close="showConfigModal = false"
      @save="saveConfig"
    />

    <CategoryMappingModal 
      v-if="showCategoryModal"
      :mapping="editingCategoryMapping"
      :source-categories="sourceCategories"
      :internal-categories="internalCategories"
      @close="showCategoryModal = false"
      @save="saveCategoryMapping"
    />

    <PublishProductModal 
      v-if="showPublishModal"
      :configs="configs"
      :products="catalogProducts"
      @close="showPublishModal = false"
      @publish="handlePublish"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Store, FolderTree, CheckCircle2, RefreshCw } from 'lucide-vue-next';
import { usePublishing } from './composables/usePublishing';
import type { WooCommerceConfig, CategoryMapping } from './types';
import WooConfigsList from './components/WooConfigsList.vue';
import WooConfigModal from './components/WooConfigModal.vue';
import CategoryMappingsList from './components/CategoryMappingsList.vue';
import CategoryMappingModal from './components/CategoryMappingModal.vue';
import WooProductMappingsList from './components/WooProductMappingsList.vue';
import PublishProductModal from './components/PublishProductModal.vue';

const {
  configs,
  categoryMappings,
  productMappings,
  sourceCategories,
  internalCategories,
  catalogProducts,
  connectionReports,
  isTestingConnection,
  isLoading,
  activeSubTab,
  errorMessage,
  successMessage,
  saveConfig,
  deleteConfig,
  checkConnection,
  saveCategoryMapping,
  deleteCategoryMapping,
  publishProduct,
  loadAll,
} = usePublishing();

const showConfigModal = ref(false);
const editingConfig = ref<Partial<WooCommerceConfig>>({});

const showCategoryModal = ref(false);
const editingCategoryMapping = ref<Partial<CategoryMapping>>({});

const showPublishModal = ref(false);

function openCreateConfig() {
  editingConfig.value = {};
  showConfigModal.value = true;
}

function openEditConfig(cfg: WooCommerceConfig) {
  editingConfig.value = { ...cfg };
  showConfigModal.value = true;
}

function openCreateCategoryMapping() {
  editingCategoryMapping.value = {};
  showCategoryModal.value = true;
}

function openEditCategoryMapping(map: CategoryMapping) {
  editingCategoryMapping.value = { ...map };
  showCategoryModal.value = true;
}

async function handlePublish(payload: { productId: string; configId: string }) {
  await publishProduct(payload.productId, payload.configId);
}
</script>

<style scoped>
.publishing-view {
  max-width: 1040px;
  margin: 0 auto;
}

.view-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

@media (min-width: 640px) {
  .view-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.view-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-main);
}

.view-desc {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}

.alert {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 13.5px;
  margin-bottom: 16px;
}

.alert-danger {
  border-color: rgba(225, 29, 72, 0.3);
  color: var(--danger);
  background: var(--danger-bg);
}

.alert-success {
  border-color: rgba(16, 185, 129, 0.3);
  color: var(--success);
  background: var(--success-bg);
}

.sub-nav-tabs {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 20px;
}

.sub-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.sub-tab-btn:hover {
  background: #f8fafc;
  color: var(--text-main);
}

.sub-tab-btn.active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%);
  border-color: var(--border-highlight);
  color: var(--accent-primary);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
