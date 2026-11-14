<template>
  <div 
    class="daftarak-brand-root inline-flex items-center select-none"
    :class="[
      variant === 'stacked' ? 'flex-col text-center gap-1.5' : 'gap-2.5',
      clickable ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
    ]"
  >
    <!-- State 1: Icon Only (for Collapsed Sidebar, Favicon, Mini Avatars) -->
    <div 
      v-if="variant === 'icon-only'"
      class="daftarak-mascot-only shrink-0 transition-transform duration-200 hover:scale-105"
      :style="{ width: `${emblemSize}px`, height: `${emblemSize}px` }"
    >
      <img 
        src="/daftarak-mascot.png" 
        alt="Daftarak Mascot" 
        class="w-full h-full object-contain select-none drop-shadow-xs" 
        draggable="false"
      />
    </div>

    <!-- State 2: Full Horizontal Logo (Original AI Mascot + "daftarak" Wordmark) -->
    <div 
      v-else 
      class="daftarak-full-logo-group flex items-center gap-2.5"
    >
      <div 
        class="daftarak-logo-img-wrap shrink-0 transition-transform duration-200 hover:scale-102"
        :style="{ height: `${logoHeight}px` }"
      >
        <img 
          src="/daftarak-logo.png" 
          alt="daftarak" 
          class="h-full w-auto object-contain select-none drop-shadow-xs" 
          draggable="false"
        />
      </div>

      <!-- Optional Badge -->
      <span 
        v-if="showBadge"
        class="daftarak-pill-badge text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 shrink-0"
      >
        {{ badgeText || 'سامانه کاتالوگ' }}
      </span>
    </div>

    <!-- Optional Subtitle / Tagline -->
    <div 
      v-if="showSubtitle && tagline" 
      class="text-[10px] text-slate-500 font-medium"
      dir="rtl"
    >
      {{ tagline }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'full' | 'horizontal' | 'icon-only' | 'stacked';
    showBadge?: boolean;
    badgeText?: string;
    showSubtitle?: boolean;
    tagline?: string;
    clickable?: boolean;
  }>(),
  {
    size: 'md',
    variant: 'horizontal',
    showBadge: false,
    showSubtitle: false,
    clickable: false,
  }
);

const logoHeight = computed(() => {
  switch (props.size) {
    case 'sm': return 32;
    case 'md': return 40;
    case 'lg': return 48;
    case 'xl': return 62;
    default: return 40;
  }
});

const emblemSize = computed(() => {
  switch (props.size) {
    case 'sm': return 32;
    case 'md': return 40;
    case 'lg': return 48;
    case 'xl': return 60;
    default: return 40;
  }
});
</script>

<style scoped>
.daftarak-logo-img-wrap img {
  max-width: none;
}
</style>
