<template>
    <div class="min-h-screen w-full bg-slate-950 text-slate-100">
        <header class="h-16"></header>
        <div class="mx-auto max-w-6xl items-center justify-center space-y-6 p-4 sm:p-8 lg:p-12">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div
                    v-for="(card, index) in summaryCards"
                    :key="index"
                    class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur"
                >
                    <div class="frame_style">
                        <NuxtImg :src="card.icon" width="30" height="30" :alt="card.label" />
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-slate-300">{{ card.label }}</p>
                        <p class="text-2xl font-semibold text-white">{{ card.total }}</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-wrap justify-center gap-6">
                <div class="w-full lg:basis-3/4 rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl backdrop-blur">
                    <div class="p-6 space-y-6 sm:p-8">
                        <div class="flex flex-col gap-2">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Levels</p>
                            <h2 class="text-2xl font-semibold text-white">Water Level Overview</h2>
                            <p class="text-sm text-slate-300">Choose a lake or river to inspect its latest level.</p>
                        </div>
                        <div
                            v-if="activeBody"
                            class="flex flex-wrap items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6"
                        >
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-400">Selected Water Body</p>
                                <p class="text-xl font-semibold text-white">{{ activeBody.name }}</p>
                                <p class="text-sm text-slate-300">{{ activeBody.type }} - {{ activeBody.location }}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs uppercase tracking-wide text-slate-400">Current level</p>
                                <p class="text-4xl font-semibold text-white">{{ activeBody.level.toFixed(2) }} m</p>
                                <p class="text-sm" :class="activeBody.statusColor">{{ activeBody.status }}</p>
                                <p class="text-xs text-slate-400">{{ statusNote[activeBody.status] }}</p>
                            </div>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p class="mb-3 text-sm font-semibold text-white">All readings</p>
                            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div
                                    v-for="body in waterBodies"
                                    :key="body.id"
                                    class="rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-sm"
                                >
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-sm font-semibold text-white">{{ body.name }}</p>
                                            <p class="text-xs text-slate-400">{{ body.type }} - {{ body.location }}</p>
                                        </div>
                                        <p class="text-sm font-semibold text-sky-200">{{ body.level.toFixed(2) }} m</p>
                                    </div>
                                    <p class="mt-2 text-xs" :class="body.statusColor">{{ body.status }}</p>
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
                        <p class="text-center text-sm text-slate-200">Select a water body to update the dashboard.</p>
                    </div>
                    <div id="water-bodies-levels" class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl">
                        <div class="flex items-center justify-between gap-2 border-b border-white/10 px-6 py-4">
                            <div>
                                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Inventory</p>
                                <p class="text-lg font-semibold text-white">Water bodies</p>
                            </div>
                            <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-white/10">{{ waterBodies.length }} total</span>
                        </div>
                        <div class="divide-y divide-white/5 overflow-y-auto max-h-[520px]">
                            <button
                                v-for="body in waterBodies"
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
                                    {{ body.level.toFixed(2) }} m
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

type BodyType = 'River' | 'Lake'
type LevelStatus = 'Low' | 'Normal' | 'High'

interface WaterBody {
    id: number
    name: string
    type: BodyType
    location: string
    lat: number
    lng: number
    level: number
    status: LevelStatus
    statusColor: string
}

const statusColorMap: Record<LevelStatus, string> = {
    Low: 'text-orange-500',
    Normal: 'text-green-600',
    High: 'text-red-600'
}

const statusNote: Record<LevelStatus, string> = {
    Low: 'Below seasonal average',
    Normal: 'Within expected range',
    High: 'Above safe threshold'
}

const getStatus = (level: number): LevelStatus => {
    if (level >= 1.4) return 'High'
    if (level <= 0.7) return 'Low'
    return 'Normal'
}

const waterBodies = computed<WaterBody[]>(() => {
    return lakes.map((lake) => {
        const level = Number(lake.waterlevel.toFixed(2))
        const status = getStatus(level)

        return {
            id: lake.id,
            name: lake.name,
            type: lake.status === 'river' ? 'River' : 'Lake',
            location: `${lake.lat.toFixed(2)}, ${lake.lng.toFixed(2)}`,
            lat: lake.lat,
            lng: lake.lng,
            level,
            status,
            statusColor: statusColorMap[status]
        }
    })
})

const selectedBodyId = ref(waterBodies.value[0]?.id ?? 0)

const activeBody = computed(() => {
    return waterBodies.value.find((body) => body.id === selectedBodyId.value) ?? null
})

const averageLevel = computed(() => {
    if (!waterBodies.value.length) return 0
    const sum = waterBodies.value.reduce((acc, body) => acc + body.level, 0)
    return Number((sum / waterBodies.value.length).toFixed(2))
})

const highAlertCount = computed(() => waterBodies.value.filter((body) => body.status === 'High').length)

const summaryCards = computed(() => [
    { label: 'Water bodies', total: lakes.length, icon: '/images/kaplya.png' },
    { label: 'Average level (m)', total: averageLevel.value, icon: '/images/river.png' },
    { label: 'High alerts', total: highAlertCount.value, icon: '/images/lake.png' }
])

const selectBody = (id: number) => {
    selectedBodyId.value = id
}
</script>

<style>
.frame_style {
    @apply w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center;
}
</style>
