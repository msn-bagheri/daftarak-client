<template>
  <section id="channels" class="py-14 border-y border-slate-100 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-8">
        <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
          اکوسیستم یکپارچه فروش
        </span>
        <h2 class="text-2xl font-black text-slate-900 mt-2">
          متصل به پرمخاطب‌ترین کانال‌های تجارت الکترونیک ایران
        </h2>
      </div>

      <!-- Channels Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="ch in channels"
          :key="ch.id"
          class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all text-center flex flex-col items-center justify-center group"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:scale-110"
            :style="{ backgroundColor: `${ch.color}15`, color: ch.color }"
          >
            <component :is="resolveIcon(ch.logoIcon)" :size="24" />
          </div>

          <h3 class="font-bold text-slate-900 text-sm mb-2">
            {{ ch.nameFa }}
          </h3>

          <span class="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
            {{ ch.badge }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ShoppingBag,
  Search,
  Store,
  Smartphone,
  Globe
} from 'lucide-vue-next';
import type { ChannelPartner } from '../types';

defineProps<{
  channels: ChannelPartner[];
}>();

function resolveIcon(name: string) {
  switch (name) {
    case 'ShoppingBag': return ShoppingBag;
    case 'Search': return Search;
    case 'Store': return Store;
    case 'Smartphone': return Smartphone;
    case 'Globe': return Globe;
    default: return ShoppingBag;
  }
}
</script>

