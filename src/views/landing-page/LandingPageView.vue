<template>
  <div class="daftarak-landing-root selection:bg-pink-500 selection:text-white antialiased" dir="rtl">
    
    <!-- Top Navigation Bar -->
    <LandingNavbar
      @navigate="handleNavigate"
      @open-auth="mode => $emit('open-auth', mode)"
    />

    <main>
      <!-- Hero Section with Value Prop, CTA & Mockup Preview -->
      <LandingHero
        :product="mockProduct"
        @navigate="handleNavigate"
        @open-auth="mode => $emit('open-auth', mode)"
      />

      <!-- Supported Channels & Marketplaces Strip -->
      <MarketplaceStrip
        :channels="channelPartners"
      />

      <!-- Straightforward 3 Benefit Cards Grid -->
      <FeatureHighlights />

      <!-- Why Daftarak & Real Business Impact Section -->
      <WhyDaftarakSection
        :metrics="trustMetrics"
        @navigate="handleNavigate"
        @open-auth="mode => $emit('open-auth', mode)"
      />

      <!-- Pricing & Subscription Plans (Shaparak Compliance) -->
      <PricingPlansSection
        @open-auth="mode => $emit('open-auth', mode)"
      />

      <!-- High-Converting CTA Banner -->
      <ConversionCta
        @navigate="handleNavigate"
        @open-auth="mode => $emit('open-auth', mode)"
      />
    </main>

    <!-- Clean Footer -->
    <LandingFooter
      @navigate="handleNavigate"
    />

  </div>
</template>

<script setup lang="ts">
import './landing.css';
import { useLandingPage } from './composables/useLandingPage';
import type { NavTab } from './types';

import LandingNavbar from './components/LandingNavbar.vue';
import LandingHero from './components/LandingHero.vue';
import MarketplaceStrip from './components/MarketplaceStrip.vue';
import FeatureHighlights from './components/FeatureHighlights.vue';
import WhyDaftarakSection from './components/WhyDaftarakSection.vue';
import PricingPlansSection from './components/PricingPlansSection.vue';
import ConversionCta from './components/ConversionCta.vue';
import LandingFooter from './components/LandingFooter.vue';

const emit = defineEmits<{
  (e: 'navigate', tab: NavTab): void;
  (e: 'open-auth', mode?: 'login' | 'register'): void;
}>();

const {
  trustMetrics,
  channelPartners,
  mockProduct,
} = useLandingPage();

function handleNavigate(tab: NavTab) {
  emit('navigate', tab);
}
</script>
