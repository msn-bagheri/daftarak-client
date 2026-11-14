<template>
  <div 
    class="daftarak-brand-root inline-flex items-center select-none"
    :class="[
      variant === 'stacked' ? 'flex-col text-center gap-1.5' : 'gap-2',
      clickable ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
    ]"
  >
    <!-- State 1: Icon Only (for Collapsed Sidebar, Favicon, Mini Avatars) -->
    <div 
      v-if="variant === 'icon-only'"
      class="daftarak-mascot-only shrink-0 transition-transform duration-200 hover:scale-105"
      :style="{ width: `${emblemSize}px`, height: `${emblemSize}px` }"
      title="دفترک - Daftarak"
    >
      <img 
        src="/daftarak-mascot.png" 
        alt="دفترک - Daftarak Mascot" 
        class="w-full h-full object-contain select-none drop-shadow-xs" 
        draggable="false"
      />
    </div>

    <!-- State 2: Full Horizontal Logo (AI Mascot + "daftarak" + Persian "دفترک" Badge) -->
    <div 
      v-else 
      class="daftarak-full-logo-group flex items-center gap-2"
    >
      <!-- The Real Mascot + English daftarak Logo -->
      <div 
        class="daftarak-logo-img-wrap shrink-0 transition-transform duration-200 hover:scale-[1.02]"
        :style="{ height: `${logoHeight}px` }"
      >
        <img 
          src="/daftarak-logo.png" 
          alt="daftarak - دفترک" 
          class="h-full w-auto object-contain select-none drop-shadow-xs" 
          draggable="false"
        />
      </div>

      <!-- Persian Identifier Badge (Clear & Bold for Persian / older users) -->
      <div 
        v-if="showPersianName" 
        class="persian-brand-badge flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-slate-900 shrink-0 select-none shadow-2xs hover:bg-amber-500/15 transition-colors"
        :class="persianBadgePadding"
        dir="rtl"
        title="دفترک - سامانه هوشمند مدیریت کاتالوگ و قیمت"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
        <span class="font-black tracking-tight text-slate-900 leading-none" :class="persianTextSize">دفترک</span>
      </div>

      <!-- Optional Extra Badge (e.g. نسخه ابری) -->
      <span 
        v-if="showBadge"
        class="daftarak-pill-badge text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 shrink-0 select-none"
      >
        {{ badgeText || 'نسخه ابری' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'full' | 'horizontal' | 'icon-only' | 'stacked';
    showPersianName?: boolean;
    showBadge?: boolean;
    badgeText?: string;
    clickable?: boolean;
  }>(),
  {
    size: 'md',
    variant: 'horizontal',
    showPersianName: true,
    showBadge: false,
    clickable: false,
  }
);

const logoHeight = computed(() => {
  switch (props.size) {
    case 'sm': return 30;
    case 'md': return 38;
    case 'lg': return 46;
    case 'xl': return 58;
    default: return 38;
  }
});

const emblemSize = computed(() => {
  switch (props.size) {
    case 'sm': return 32;
    case 'md': return 40;
    case 'lg': return 48;
    case 'xl': return 58;
    default: return 40;
  }
});

const persianBadgePadding = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-2 py-0.5';
    case 'md': return 'px-2.5 py-1';
    case 'lg': return 'px-3 py-1';
    case 'xl': return 'px-3.5 py-1.5';
    default: return 'px-2.5 py-1';
  }
});

const persianTextSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-[11px]';
    case 'md': return 'text-xs';
    case 'lg': return 'text-sm';
    case 'xl': return 'text-base';
    default: return 'text-xs';
  }
});
</script>

<style scoped>
.daftarak-logo-img-wrap img {
  max-width: none;
}
.persian-brand-badge {
  font-family: 'Vazirmatn', system-ui, -apple-system, sans-serif;
}
</style>
