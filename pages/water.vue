<template>
<div class="items-center justify-center p-24 bg-gray-900 space-y-6">
    <div class="items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100 ">
        <p class="text-xl text-start text-blue-600">Pathogen and MicroBiogiological Monitoring</p>
        <p class="text-sm text-start text-blue-600">Detection and monitoring of potential waterborne pathogens and indicator organisms to ensure water safety and quality.</p>
    </div>
    <div class="items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100 ">
        <p class="text-xl text-wrap text-blue-600">Water bodies</p>
        <select v-model="selectedWaterBody" class="border border-gray-300 rounded-md px-3 py-2 mt-2">
            <option value="" disabled>Select a water body</option>
            <option v-for="lake in lakes" :key="lake.name" :value="lake.name">{{ lake.name }}</option>
        </select>
        <p class="text-sm text-gray-500 mt-2">Currently selected: {{ selectedWaterBody }}</p>
    </div>
    
    <div v-if="selectedLake" class="w-full h-full space-y-6">
        <div class="w-full h-64 bg-gradient-to-t from-lime-500 to-green-300 rounded-2xl overflow-hidden">
            <div class="flex flex-col items-center justify-center h-full">
                <h2 class="text-2xl font-bold text-white mb-4">{{ selectedLake.name }} Lake Dashboard</h2>
                
                <!-- Safety Percentage Only -->
                <div class="text-center">
                    <div class="text-6xl font-bold text-white mb-2">{{ safetyPercentage }}%</div>
                    <div class="text-xl font-semibold text-white" :class="safetyColor">{{ safetyStatus }}</div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap w-full justify-center h-64 space-x-10">
            <div class="asdstyle">
                <div class="text-center">
                    <h3 class="text-lg font-semibold text-blue-600">E. coli (CFU/100mL)</h3>
                    <p class="text-2xl font-bold">{{ selectedLake.E }}</p>
                </div>
            </div>
            <div class="asdstyle">
                <div class="text-center">
                    <h3 class="text-lg font-semibold text-blue-600">Coliform (CFU/100mL)</h3>
                    <p class="text-2xl font-bold">{{ selectedLake.coliform }}</p>
                </div>
            </div>
            <div class="asdstyle">
                <div class="text-center">
                    <h3 class="text-lg font-semibold text-blue-600">Giardia (cysts/L)</h3>
                    <p class="text-2xl font-bold">{{ selectedLake.giardia }}</p>
                </div>
            </div>
            <div class="asdstyle">
                <div class="text-center">
                    <h3 class="text-lg font-semibold text-blue-600">Enterococci (CFU/100mL)</h3>
                    <p class="text-2xl font-bold">{{ selectedLake.enterococci }}</p>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl p-6">
            <h3 class="text-xl font-bold text-blue-600">Statistics for {{ selectedLake.name }}</h3>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { lakes } from '~/components/data';

const selectedWaterBody = ref('Ishim'); // Default to 'Ishim'

// Computed property to find the selected lake
const selectedLake = computed(() => {
  return lakes.find(lake => lake.name === selectedWaterBody.value);
});

// Safety assessment computed properties
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
  if (percentage >= 75) return 'text-lime-100';
  if (percentage >= 60) return 'text-yellow-100';
  if (percentage >= 40) return 'text-orange-100';
  return 'text-red-100';
});
</script>

<style scoped>
.asdstyle{
  @apply lg:w-72 w-96 h-48 bg-white rounded-2xl overflow-hidden shadow-md border border-blue-100;
}
</style>