<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
    
    <!-- Drawer Container -->
    <div class="w-full sm:max-w-md bg-white h-[85vh] sm:h-[90vh] rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
      
      <!-- Drawer Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <ClipboardList :size="18" class="text-blue-600" />
          <h2 class="text-sm font-black text-slate-900">
            {{ currentStep === 'success' ? 'پیش‌فاکتور ثبت شد' : (currentStep === 'form' ? 'ثبت اطلاعات و تسویه B2B' : 'لیست استعلام و سفارش همکار') }}
          </h2>
          <span v-if="currentStep === 'list'" class="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
            {{ formatNumberFa(totalCount) }} قلم
          </span>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          @click="handleClose"
        >
          <X :size="16" />
        </button>
      </div>

      <!-- ================= STEP 1: ITEMS LIST ================= -->
      <div v-if="currentStep === 'list'" class="flex-1 overflow-y-auto p-4 space-y-3">
        <div v-if="items.length === 0" class="py-16 text-center text-slate-400">
          <PackageOpen :size="48" class="mx-auto mb-3 opacity-30" />
          <p class="text-xs font-bold text-slate-600">هنوز کالایی به لیست استعلام اضافه نکرده‌اید</p>
          <p class="text-[11px] text-slate-400 mt-1">با کلیک روی دکمه سفارش هر کالا، اقلام به این لیست اضافه می‌شوند.</p>
        </div>

        <div
          v-for="item in items"
          :key="item.product.id"
          class="p-3 rounded-2xl border border-slate-200/90 bg-white flex items-center gap-3 shadow-2xs"
        >
          <img
            :src="item.product.imageUrl"
            :alt="item.product.title"
            class="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
          />

          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-800 truncate">{{ item.product.title }}</h4>
            <div class="text-[10px] text-slate-400 font-mono" dir="ltr">{{ item.product.sku }}</div>
            
            <div v-if="showPrices" class="text-xs font-black text-blue-700 mt-1">
              {{ formatNumberFa(item.product.price * item.quantity) }} تومان
            </div>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
            <button
              type="button"
              class="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              @click="$emit('update-qty', item.product.id, -1)"
            >
              <Minus :size="12" />
            </button>
            <span class="w-8 text-center text-xs font-bold text-slate-800">{{ formatNumberFa(item.quantity) }}</span>
            <button
              type="button"
              class="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              @click="$emit('update-qty', item.product.id, 1)"
            >
              <Plus :size="12" />
            </button>
          </div>

          <!-- Remove Item Button -->
          <button
            type="button"
            class="p-1.5 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
            title="حذف از لیست"
            @click="$emit('remove-item', item.product.id)"
          >
            <Trash2 :size="14" />
          </button>
        </div>
      </div>

      <!-- ================= STEP 2: B2B ORDER & SETTLEMENT FORM ================= -->
      <div v-else-if="currentStep === 'form'" class="flex-1 overflow-y-auto p-4 space-y-4">
        
        <div class="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-2.5">
          <Building2 :size="18" class="text-blue-600 shrink-0" />
          <p class="text-[11px] text-blue-800 leading-relaxed font-bold">
            ثبت پیش‌فاکتور رسمی همکار؛ اطلاعات شما و شرایط تسویه مستقیم برای تأمین‌کننده ارسال می‌شود.
          </p>
        </div>

        <!-- Customer Info -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              نام و نام خانوادگی / نام فروشگاه <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="customerName"
              type="text"
              placeholder="مثال: فروشگاه دیجیتال البرز (رضا احمدی)"
              class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              شماره تلفن همراه جهت تماس <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="customerPhone"
              type="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">شهر مقصد</label>
              <input
                v-model="customerCity"
                type="text"
                placeholder="مثال: تبریز"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">باربری ترجیحی</label>
              <input
                v-model="carrierPreference"
                type="text"
                placeholder="مثال: باربری وطن"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">آدرس کامل فروشگاه یا محل تحویل</label>
            <textarea
              v-model="customerAddress"
              rows="2"
              placeholder="خیابان، پاساژ یا بازار، پلاک و شماره تماس تحویل‌گیرنده..."
              class="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800 resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Payment Settlement Selection -->
        <div class="pt-2 border-t border-slate-100">
          <label class="block text-xs font-black text-slate-800 mb-2">
            شرایط تسویه‌حساب درخواستی شما:
          </label>
          <div class="space-y-2">
            
            <!-- Credit Term (if allowed) -->
            <label 
              v-if="profile?.acceptsCredit !== false"
              class="flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all select-none"
              :class="paymentMethod === 'credit' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white'"
            >
              <input 
                type="radio" 
                value="credit" 
                v-model="paymentMethod" 
                class="mt-0.5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <div>
                <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Handshake :size="13" class="text-emerald-600" />
                  <span>حساب دفتری (نسیه همکار)</span>
                </div>
                <p class="text-[10px] text-slate-500 mt-0.5">ثبت در حساب دفتری طبق روال همیشگی و سقف اعتبار همکاران</p>
              </div>
            </label>

            <!-- Cheque Term (if allowed) -->
            <label 
              v-if="profile?.acceptsCheque !== false"
              class="flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all select-none"
              :class="paymentMethod === 'cheque' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white'"
            >
              <input 
                type="radio" 
                value="cheque" 
                v-model="paymentMethod" 
                class="mt-0.5 text-amber-600 focus:ring-amber-500 border-slate-300"
              />
              <div class="flex-1">
                <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck :size="13" class="text-amber-600" />
                  <span>چک صیادی مدت‌دار</span>
                </div>
                <p class="text-[10px] text-slate-500 mt-0.5">صدور چک صیاد بنفش با استعلام سفید</p>
                
                <!-- Due date input if cheque selected -->
                <div v-if="paymentMethod === 'cheque'" class="mt-2 flex items-center gap-2">
                  <span class="text-[11px] text-slate-600 font-bold">مدت چک:</span>
                  <input
                    v-model="chequeDueDate"
                    type="text"
                    placeholder="مثال: ۳۰ روزه / ۴۵ روزه"
                    class="text-[11px] px-2.5 py-1 rounded-lg border border-amber-300 bg-white focus:outline-hidden text-slate-800 w-32"
                  />
                </div>
              </div>
            </label>

            <!-- Cash Term (if allowed) -->
            <label 
              v-if="profile?.acceptsCash !== false"
              class="flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all select-none"
              :class="paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-white'"
            >
              <input 
                type="radio" 
                value="cash" 
                v-model="paymentMethod" 
                class="mt-0.5 text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <div>
                <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CreditCard :size="13" class="text-blue-600" />
                  <span>تسویه نقدی با تخفیف</span>
                </div>
                <p class="text-[10px] text-slate-500 mt-0.5">واریز وجه به شماره حساب/کارت اعلامی قبل از ارسال بار</p>
              </div>
            </label>

          </div>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">توضیحات و هماهنگی باربری</label>
          <input
            v-model="orderNotes"
            type="text"
            placeholder="مثال: بسته‌بندی کارتن‌ها محکم باشد و حواله را به باربری وطن تحویل دهید"
            class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-slate-800"
          />
        </div>

      </div>

      <!-- ================= STEP 3: SUCCESS CONFIRMATION ================= -->
      <div v-else-if="currentStep === 'success'" class="flex-1 overflow-y-auto p-6 text-center space-y-4">
        
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 :size="34" />
        </div>

        <div>
          <h3 class="text-base font-black text-slate-900">پیش‌فاکتور با موفقیت ثبت شد</h3>
          <p class="text-xs text-slate-500 mt-1">
            سفارش شما در سامانه دفترک ثبت گردید و تأمین‌کننده از اقلام و شرایط درخواستی مطلع شد.
          </p>
        </div>

        <!-- Tracking Code Card -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
          <span class="text-[11px] text-slate-400 font-bold block mb-1">کد پیگیری پیش‌فاکتور شما:</span>
          <div class="flex items-center justify-center gap-2">
            <span class="font-mono text-xl font-black text-slate-900 tracking-wider">#{{ submittedOrderId }}</span>
            <button
              type="button"
              class="p-1.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              title="کپی کد پیگیری"
              @click="handleCopyOrderId"
            >
              <Copy :size="16" />
            </button>
          </div>
        </div>

        <!-- Summary & Next Steps -->
        <div class="text-right p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1.5">
          <div class="font-bold flex items-center gap-1.5">
            <Clock :size="14" class="text-amber-700" />
            <span>گام بعدی:</span>
          </div>
          <p class="text-[11px] text-slate-600 leading-relaxed">
            تأمین‌کننده پس از بررسی موجودی انبار و شرایط تسویه انتخابی شما، با شماره همراهتان تماس خواهد گرفت یا حواله باربری را صادر می‌کند.
          </p>
        </div>

        <!-- Action Buttons in Success Screen -->
        <div class="space-y-2 pt-2">
          <a
            :href="`tel:${supplierPhone}`"
            class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <PhoneCall :size="15" />
            <span>تماس فوری جهت تایید نهایی ({{ supplierPhone }})</span>
          </a>

          <a
            v-if="whatsappNumber"
            :href="`https://wa.me/98${formatWhatsappNumber(whatsappNumber)}?text=${encodeURIComponent(generateSuccessWhatsAppText())}`"
            target="_blank"
            class="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle :size="15" class="text-emerald-600" />
            <span>ارسال مشخصات سفارش در واتساپ</span>
          </a>

          <button
            type="button"
            class="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            @click="finishAndClose"
          >
            بستن و بازگشت به کاتالوگ
          </button>
        </div>

      </div>

      <!-- ================= DRAWER FOOTERS ================= -->
      
      <!-- Footer for Step 1: Items List -->
      <div v-if="currentStep === 'list' && items.length > 0" class="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
        
        <!-- Total Price Summary -->
        <div v-if="showPrices" class="flex items-baseline justify-between">
          <span class="text-xs font-bold text-slate-500">جمع کل برآورد اولیه:</span>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-black text-slate-900">{{ formatNumberFa(totalPrice) }}</span>
            <span class="text-xs font-bold text-slate-500">تومان</span>
          </div>
        </div>

        <!-- Primary Action: Go to Step 2 (Submit Official Order Form) -->
        <button
          type="button"
          class="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          @click="currentStep = 'form'"
        >
          <span>تکمیل اطلاعات و ثبت پیش‌فاکتور رسمی</span>
          <ArrowLeft :size="16" />
        </button>

        <!-- Secondary Actions: Quick Direct Call or Copy text -->
        <div class="grid grid-cols-2 gap-2">
          <a
            :href="`tel:${supplierPhone}`"
            class="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <PhoneCall :size="14" class="text-emerald-600" />
            <span>سفارش تلفنی</span>
          </a>

          <button
            type="button"
            class="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            @click="handleCopyText"
          >
            <Copy :size="14" />
            <span>کپی متن اقلام</span>
          </button>
        </div>

      </div>

      <!-- Footer for Step 2: Form submission -->
      <div v-else-if="currentStep === 'form'" class="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
        <button
          type="button"
          class="w-1/3 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          @click="currentStep = 'list'"
        >
          بازگشت به اقلام
        </button>

        <button
          type="button"
          class="w-2/3 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          :disabled="isSubmitting"
          @click="handleSubmitOrder"
        >
          <span v-if="isSubmitting">در حال ثبت...</span>
          <span v-else>تأیید و ارسال سفارش B2B</span>
          <Check :size="16" />
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  ClipboardList,
  X,
  PackageOpen,
  Minus,
  Plus,
  Trash2,
  PhoneCall,
  Copy,
  MessageCircle,
  Building2,
  Handshake,
  FileCheck,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Check
} from 'lucide-vue-next';
import { formatNumberFa } from '../../../utils/formatters';
import type { OrderInquiryItem, SupplierProfile } from '../types';
import type { PaymentMethod, Order, OrderItem } from '../../orders/types';
import { ORDERS_STORAGE_KEY } from '../../orders/composables/useOrders';

const props = defineProps<{
  isOpen: boolean;
  items: OrderInquiryItem[];
  totalCount: number;
  totalPrice: number;
  showPrices: boolean;
  supplierPhone: string;
  whatsappNumber?: string;
  profile?: SupplierProfile;
  generateInquiryText: () => string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update-qty', productId: string, delta: number): void;
  (e: 'remove-item', productId: string): void;
  (e: 'clear'): void;
}>();

type DrawerStep = 'list' | 'form' | 'success';

const currentStep = ref<DrawerStep>('list');
const customerName = ref<string>('');
const customerPhone = ref<string>('');
const customerCity = ref<string>('');
const customerAddress = ref<string>('');
const carrierPreference = ref<string>('باربری وطن');
const paymentMethod = ref<PaymentMethod>('credit');
const chequeDueDate = ref<string>('چک ۴۵ روزه');
const orderNotes = ref<string>('');
const isSubmitting = ref<boolean>(false);
const submittedOrderId = ref<string>('');

function formatWhatsappNumber(num: string): string {
  return num.replace(/^0+/, '');
}

function handleClose() {
  if (currentStep.value === 'success') {
    finishAndClose();
  } else {
    emit('close');
  }
}

function finishAndClose() {
  emit('clear');
  currentStep.value = 'list';
  emit('close');
}

function handleCopyText() {
  const text = props.generateInquiryText();
  navigator.clipboard.writeText(text);
  alert('متن کامل اقلام سفارش در کلیپ‌بورد کپی شد؛ اکنون می‌توانید آن را در چت یا پیامک ارسال کنید.');
}

function handleCopyOrderId() {
  navigator.clipboard.writeText(submittedOrderId.value);
  alert('شماره پیگیری در کلیپ‌بورد کپی شد.');
}

function generateSuccessWhatsAppText(): string {
  return `سلام و احترام، پیش‌فاکتور همکار به شماره #${submittedOrderId.value} به مبلغ ${formatNumberFa(props.totalPrice)} تومان توسط ${customerName.value} ثبت گردید. لطفاً بررسی و تأیید بفرمایید.`;
}

function handleSubmitOrder() {
  if (!customerName.value.trim()) {
    alert('لطفاً نام خریدار یا فروشگاه خود را وارد کنید.');
    return;
  }

  if (!customerPhone.value.trim() || customerPhone.value.length < 10) {
    alert('لطفاً شماره تلفن همراه معتبر وارد کنید.');
    return;
  }

  isSubmitting.value = true;

  try {
    const newId = 'DFT-' + Math.floor(10000 + Math.random() * 90000);
    const orderItems: OrderItem[] = props.items.map(item => ({
      productId: item.product.id,
      title: item.product.title,
      sku: item.product.sku,
      imageUrl: item.product.imageUrl,
      price: item.product.price,
      quantity: item.quantity,
      total: item.product.price * item.quantity,
    }));

    const newOrder: Order = {
      id: newId,
      createdAt: new Date().toISOString(),
      customerName: customerName.value.trim(),
      customerPhone: customerPhone.value.trim(),
      customerCity: customerCity.value.trim(),
      customerAddress: customerAddress.value.trim(),
      carrierPreference: carrierPreference.value.trim(),
      paymentMethod: paymentMethod.value,
      chequeDueDate: paymentMethod.value === 'cheque' ? chequeDueDate.value : undefined,
      status: 'pending',
      items: orderItems,
      totalAmount: props.totalPrice,
      notes: orderNotes.value.trim(),
    };

    // Save to shared localStorage key
    const existingOrdersStr = localStorage.getItem(ORDERS_STORAGE_KEY);
    const existingOrders: Order[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
    existingOrders.unshift(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));

    submittedOrderId.value = newId;
    currentStep.value = 'success';
  } catch (err: any) {
    alert('خطا در ثبت سفارش: ' + (err?.message || 'خطای ناشناخته'));
  } finally {
    isSubmitting.value = false;
  }
}
</script>
