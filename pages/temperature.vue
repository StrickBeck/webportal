<template>
    <div class="min-h-screen w-full bg-slate-950 text-slate-100">
        <header class="h-16"></header>
        <div class="mx-auto max-w-6xl items-center justify-center space-y-6 p-4 sm:p-8 lg:p-12">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div v-for="(value,index) in summaryCards" :key="index" class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur">
                    <div class="frame_style">
                        <NuxtImg :src="value.icon" width="30" height="30" :alt="value.label" />
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-slate-300">{{ value.label }}</p>
                        <p class="text-2xl font-semibold text-white">{{ value.total }}</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-wrap justify-center gap-6">
                <div class="w-full lg:basis-3/4 rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl backdrop-blur">
                    <div class="h-full w-full">
                        <div class="space-y-6 p-6 sm:p-8">
                            <div class="flex flex-col gap-2">
                                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Temperature</p>
                                <h2 class="text-2xl font-semibold text-white">Water Temperature Overview</h2>
                            </div>
                            <div v-if="activeBody" class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p class="text-xs uppercase tracking-wide text-slate-400">Selected water body</p>
                                <p class="text-xl font-semibold text-white">{{ activeBody.name }}</p>
                                <p class="text-sm text-slate-300">{{ activeBody.type }} - {{ activeBody.location }}</p>
                            </div>
                            <div v-if="activeBody" class="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p class="text-xs uppercase tracking-wide text-slate-300">Min</p>
                                    <p class="text-3xl font-semibold text-white">{{ activeBody.min.toFixed(1) }}&deg;C</p>
                                    <p class="text-sm text-slate-400">Lowest reading</p>
                                </div>
                                <div class="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500 to-cyan-500 p-4 text-slate-950">
                                    <p class="text-xs uppercase tracking-wide opacity-70">Avg</p>
                                    <p class="text-3xl font-semibold">{{ activeBody.avg.toFixed(1) }}&deg;C</p>
                                    <p class="text-sm opacity-80">Daily average</p>
                                </div>
                                <div class="rounded-2xl border border-white/10 bg-orange-500/15 p-4">
                                    <p class="text-xs uppercase tracking-wide text-orange-200">Max</p>
                                    <p class="text-3xl font-semibold text-white">{{ activeBody.max.toFixed(1) }}&deg;C</p>
                                    <p class="text-sm text-orange-100">Highest reading</p>
                                </div>
                            </div>
                            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p class="mb-3 text-sm font-semibold text-white">All temperatures</p>
                                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div v-for="body in temperatureBodies" :key="body.id" class="rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-sm">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <p class="text-sm font-semibold text-white">{{ body.name }}</p>
                                                <p class="text-xs text-slate-400">{{ body.type }} - {{ body.location }}</p>
                                            </div>
                                            <p class="text-sm font-semibold text-sky-200">{{ body.avg.toFixed(1) }}&deg;C avg</p>
                                        </div>
                                        <div class="mt-2 flex items-center justify-between text-xs text-slate-400">
                                            <span>Min {{ body.min.toFixed(1) }}&deg;C</span>
                                            <span>Max {{ body.max.toFixed(1) }}&deg;C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex w-full flex-col space-y-6 lg:basis-1/5">
                    <div class="flex flex-col items-center justify-start rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur">
                        <div class="frame_style">
                            <NuxtImg src="/images/kaplya.png" width="28" height="28" alt="Water drop icon" />
                        </div>
                        <p class="text-center text-sm text-slate-200">Select a water body to view its detailed temperature.</p>
                    </div>
                    <div id="water-bodies-temp" class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl">
                        <div class="flex items-center justify-between gap-2 border-b border-white/10 px-6 py-4">
                            <div>
                                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Inventory</p>
                                <p class="text-lg font-semibold text-white">Water bodies</p>
                            </div>
                            <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-white/10">{{ temperatureBodies.length }} total</span>
                        </div>
                        <div class="divide-y divide-white/5 overflow-y-auto max-h-[520px]">
                            <button
                                v-for="body in temperatureBodies"
                                :key="body.id"
                                @click="selectBody(body.id)"
                                :class="[
                                    'group flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition',
                                    body.id === selectedBodyId ? 'bg-white/10' : 'hover:bg-white/5'
                                ]"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                                        <NuxtImg src="/images/kaplya.png" width="22" height="22" class="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-white group-hover:text-white">{{ body.name }}</p>
                                        <p class="text-xs text-slate-400">Lat {{ body.lat.toFixed(2) }}, Lng {{ body.lng.toFixed(2) }}</p>
                                    </div>
                                </div>
                                <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-white/20">
                                    {{ body.avg.toFixed(1) }}°C
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { lakes } from '~/components/data'

interface LakeWithTemp {
    id: number
    name: string
    type: 'River' | 'Lake'
    location: string
    lat: number
    lng: number
    min: number
    avg: number
    max: number
}

const temperatureReadings = ref([
    { id: 1, min: 2.4, avg: 3.8, max: 5.1},
    { id: 2, min: 4.0, avg: 5.2, max: 6.4},
    { id: 3, min: 3.6, avg: 4.9, max: 6.0},
    { id: 4, min: 2.1, avg: 3.2, max: 4.6},
    { id: 6, min: 2.8, avg: 4.0, max: 6.2}
])

const temperatureBodies = computed<LakeWithTemp[]>(() => {
    return lakes.map((lake) => {
        const reading = temperatureReadings.value.find((entry) => entry.id === lake.id)
        return {
            id: lake.id,
            name: lake.name,
            type: lake.status === 'river' ? 'River' : 'Lake',
            location: `${lake.lat.toFixed(2)}, ${lake.lng.toFixed(2)}`,
            lat: lake.lat,
            lng: lake.lng,
            min: reading?.min ?? 0,
            avg: reading?.avg ?? 0,
            max: reading?.max ?? 0,
        }
    })
})

const selectedBodyId = ref(temperatureBodies.value[0]?.id ?? 0)

const activeBody = computed(() => {
    return temperatureBodies.value.find((body) => body.id === selectedBodyId.value) ?? null
})

const selectBody = (id: number) => {
    selectedBodyId.value = id
}

const summaryCards = computed(() => [
    { label: 'Total Water Body', total: lakes.length, icon: '/images/kaplya.png' },
    { label: 'Rivers', total: lakes.filter((lake) => lake.status === 'river').length, icon: '/images/river.png' },
    { label: 'Lakes & Reservoirs', total: lakes.filter((lake) => lake.status === 'lake').length, icon: '/images/lake.png' }
])
</script>

<style>
.frame_style{
    @apply w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center;
}
</style>
