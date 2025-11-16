<template>
  <div class="min-h-screen flex flex-col bg-slate-100">
    <header class="absolute top-0 left-0 w-full z-20">
      <nav class="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 text-white">
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-semibold tracking-widest">
            SKOHydroVision
          </span>
        </NuxtLink>

        <button
          class="rounded-full bg-slate-900/60 px-3 py-2"
          @click="isOpen = !isOpen"
        >
          <div class="space-y-1">
            <span
              :class="[
                'block h-0.5 w-6 bg-white transition-transform duration-300',
                isOpen ? 'translate-y-1.5 rotate-45' : ''
              ]"
            ></span>
            <span
              :class="[
                'block h-0.5 w-6 bg-white transition-opacity duration-300',
                isOpen ? 'opacity-0' : 'opacity-100'
              ]"
            ></span>
            <span
              :class="[
                'block h-0.5 w-6 bg-white transition-transform duration-300',
                isOpen ? '-translate-y-1.5 -rotate-45' : ''
              ]"
            ></span>
          </div>
        </button>
      </nav>

      <div
        v-if="isOpen"
        class="fixed right-4 top-16 w-2/3 max-w-xs bg-slate-900/95 rounded-xl shadow-lg px-6 py-4 space-y-3 text-sm uppercase tracking-wide text-white"
      >
        <NuxtLink to="/temperature" class="block">Temperature</NuxtLink>
        <NuxtLink to="/water-level" class="block">Water Level</NuxtLink>
        <NuxtLink to="/map" class="block">Map</NuxtLink>
        <NuxtLink to="/pathogen" class="block">Pathogen Infection</NuxtLink>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="flex flex-row w-full bg-slate-800 border-t border-slate-600 items-center justify-center px-4 py-3 gap-4 text-white">
      <span class="text-xs sm:text-sm tracking-wide text-center">
        Open in Google Maps
      </span>
      <a
        href="https://www.google.com/maps"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/public/images/googlemap.webp" class="w-8 h-8 sm:w-8 sm:h-10" />
      </a>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
