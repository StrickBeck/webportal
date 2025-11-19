<template>
  <section class="min-h-screen w-full bg-gray-900 px-4 py-12 text-blue-600">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2 rounded-2xl border border-blue-100 bg-white p-6 shadow-md">
          <p class="text-xl font-semibold">Pathogen & Microbiological Monitoring</p>
          <p class="text-sm text-gray-600">
            Detection and monitoring of potential waterborne pathogens and indicator organisms ensure water safety and quality
            across city reservoirs.
          </p>
        </div>
        <div class="space-y-3 rounded-2xl border border-blue-100 bg-white p-6 shadow-md">
          <p class="text-xl font-semibold">Water Bodies</p>
          <select
            v-model="selectedWaterBody"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="" disabled>Select a water body</option>
            <option v-for="lake in lakes" :key="lake.name" :value="lake.name">{{ lake.name }}</option>
          </select>
          <p class="text-sm text-gray-500">Currently selected: {{ selectedWaterBody }}</p>
        </div>
      </div>

      <div v-if="selectedLake" class="flex flex-col gap-6">
        <div class="overflow-hidden rounded-2xl bg-gradient-to-t from-lime-500 to-green-300">
          <div class="flex flex-col items-center justify-center gap-3 px-6 py-12 text-white">
            <h2 class="text-center text-2xl font-bold">{{ selectedLake.name }} Lake Dashboard</h2>
            <div class="text-center">
              <div class="text-5xl font-bold md:text-6xl">{{ safetyPercentage }}%</div>
              <div class="text-lg font-semibold md:text-xl" :class="safetyColor">{{ safetyStatus }}</div>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-md">
            <h3 class="text-lg font-semibold">E. coli (CFU/100mL)</h3>
            <p class="text-2xl font-bold">{{ selectedLake.E }}</p>
          </div>
          <div class="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-md">
            <h3 class="text-lg font-semibold">Coliform (CFU/100mL)</h3>
            <p class="text-2xl font-bold">{{ selectedLake.coliform }}</p>
          </div>
          <div class="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-md">
            <h3 class="text-lg font-semibold">Giardia (cysts/L)</h3>
            <p class="text-2xl font-bold">{{ selectedLake.giardia }}</p>
          </div>
          <div class="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-md">
            <h3 class="text-lg font-semibold">Enterococci (CFU/100mL)</h3>
            <p class="text-2xl font-bold">{{ selectedLake.enterococci }}</p>
          </div>
        </div>

        <div class="rounded-2xl border border-blue-100 bg-white p-6 shadow-md">
          <h3 class="text-xl font-bold">Statistics for {{ selectedLake.name }}</h3>
          <p class="mt-2 text-sm text-gray-600">
            Safety score interprets the number of parameters meeting WHO recommended microbial thresholds. Lower indicators reflect
            healthier waterways and reduced pathogen risk for recreation and supply.
          </p>
          <div class="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
            <p><span class="font-semibold text-blue-600">Safe metrics:</span> {{ safetyPercentage >= 40 ? 'Most' : 'Few' }}</p>
            <p><span class="font-semibold text-blue-600">Current alert:</span> {{ safetyStatus }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
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
