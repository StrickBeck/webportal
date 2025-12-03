<template>
  <div class="min-h-screen w-full bg-slate-950 text-slate-100">
    <header class="h-16"></header>
    <section class="px-4 pb-12 pt-6">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <p class="text-sm uppercase tracking-[0.2em] text-slate-300">Microbiology</p>
            <p class="text-2xl font-semibold text-white">Pathogen & Microbiological Monitoring</p>
            <p class="text-sm text-slate-300">
              Detection and monitoring of potential waterborne pathogens and indicator organisms ensure water safety and quality
              across city reservoirs.
            </p>
          </div>
          <div class="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <p class="text-sm uppercase tracking-[0.2em] text-slate-300">Water bodies</p>
            <p class="text-xl font-semibold text-white">Select a site</p>
            <select
              v-model="selectedWaterBody"
              class="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 focus:border-white/30 focus:outline-none"
            >
              <option value="" disabled>Select a water body</option>
              <option v-for="lake in lakes" :key="lake.name" :value="lake.name">{{ lake.name }}</option>
            </select>
            <p class="text-sm text-slate-400">Currently selected: {{ selectedWaterBody }}</p>
          </div>
        </div>

        <div v-if="selectedLake" class="flex flex-col gap-6">
          <div class="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500 to-teal-400 shadow-xl">
            <div class="flex flex-col items-center justify-center gap-3 px-6 py-12 text-white">
              <h2 class="text-center text-2xl font-bold">{{ selectedLake.name }} Lake Dashboard</h2>
              <div class="text-center">
                <div class="text-5xl font-bold md:text-6xl">{{ safetyPercentage }}%</div>
                <div class="text-lg font-semibold md:text-xl" :class="safetyColor">{{ safetyStatus }}</div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-md">
              <h3 class="text-lg font-semibold text-white">E. coli (CFU/100mL)</h3>
              <p class="text-2xl font-bold text-slate-100">{{ selectedLake.E }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-md">
              <h3 class="text-lg font-semibold text-white">Coliform (CFU/100mL)</h3>
              <p class="text-2xl font-bold text-slate-100">{{ selectedLake.coliform }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-md">
              <h3 class="text-lg font-semibold text-white">Giardia (cysts/L)</h3>
              <p class="text-2xl font-bold text-slate-100">{{ selectedLake.giardia }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-md">
              <h3 class="text-lg font-semibold text-white">Enterococci (CFU/100mL)</h3>
              <p class="text-2xl font-bold text-slate-100">{{ selectedLake.enterococci }}</p>
            </div>
          </div>

          <div class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <h3 class="text-xl font-bold text-white">Statistics for {{ selectedLake.name }}</h3>
            <p class="mt-2 text-sm text-slate-300">
              Safety score interprets the number of parameters meeting WHO recommended microbial thresholds. Lower indicators reflect
              healthier waterways and reduced pathogen risk for recreation and supply.
            </p>
            <div class="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <p><span class="font-semibold text-sky-200">Safe metrics:</span> {{ safetyPercentage >= 40 ? 'Most' : 'Few' }}</p>
              <p><span class="font-semibold text-sky-200">Current alert:</span> {{ safetyStatus }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { lakes } from '~/components/data';

const selectedWaterBody = ref('Ishim'); 

const selectedLake = computed(() => {
  return lakes.find(lake => lake.name === selectedWaterBody.value);
});

const safetyAssessment = computed(() => {
  const lake = selectedLake.value;
  if (!lake) return { percentage: 0 };

  let safeCount = 0;
  const totalParams = 4;

  const eColiValue = parseInt(lake.E.toString().split(' ')[0]);
  const coliformValue = parseInt(lake.coliform.toString().split(' ')[0]);
  const giardiaValue = parseInt(lake.giardia.toString().split(' ')[0]);
  const enterococciValue = parseInt(lake.enterococci.toString().split(' ')[0]);
  if (eColiValue < 100) safeCount++;
  if (coliformValue < 50) safeCount++;
  if (giardiaValue < 2) safeCount++;
  if (enterococciValue < 35) safeCount++;

  const percentage = Math.round((safeCount / totalParams) * 100);

  return { percentage };
});

const safetyPercentage = computed(() => safetyAssessment.value.percentage);

const safetyStatus = computed(() => {
  const percentage = safetyPercentage.value;
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 75) return 'Good';
  if (percentage >= 60) return 'Moderate';
  if (percentage >= 40) return 'Poor';
  return 'Dangerous';
});

const safetyColor = computed(() => {
  const percentage = safetyPercentage.value;
  if (percentage >= 90) return 'text-green-100';
  if (percentage >= 75) return 'text-green-100';
  if (percentage >= 60) return 'text-yellow-100';
  if (percentage >= 40) return 'text-orange-100';
  return 'text-red-100';
});
</script>

<style scoped>
</style>
