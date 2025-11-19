<template>
    <div class="w-full h-full items-center justify-center p-4 lg:p-16 space-y-6 bg-gray-900">
        <div class="h-16"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
                v-for="(card, index) in summaryCards"
                :key="index"
                class="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100"
            >
                <div class="frame_style">
                    <NuxtImg :src="card.icon" width="30" height="30" :alt="card.label" />
                </div>
                <div>
                    <p class="text-sm text-blue-600">{{ card.label }}</p>
                    <p class="text-2xl text-blue-900">{{ card.total }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-6 w-full justify-center">
            <div class="w-full lg:basis-3/4 bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <div class="p-6 space-y-6">
                    <div class="flex flex-col gap-2">
                        <h2 class="text-2xl text-blue-900 font-semibold">Water Level Overview</h2>
                        <p class="text-sm text-gray-600">Choose a lake or river to inspect its latest level.</p>
                    </div>
                    <div
                        v-if="activeBody"
                        class="rounded-2xl border border-blue-100 p-6 flex flex-wrap items-start justify-between gap-6 bg-gradient-to-br from-white to-blue-50/40"
                    >
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-wide">Selected Water Body</p>
                            <p class="text-xl font-semibold text-blue-900">{{ activeBody.name }}</p>
                            <p class="text-sm text-gray-600">{{ activeBody.type }} &middot; {{ activeBody.location }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-gray-500 uppercase tracking-wide">Current level</p>
                            <p class="text-4xl font-semibold text-blue-900">{{ activeBody.level.toFixed(2) }} m</p>
                            <p class="text-sm" :class="activeBody.statusColor">{{ activeBody.status }}</p>
                            <p class="text-xs text-gray-500">{{ statusNote[activeBody.status] }}</p>
                        </div>
                    </div>
                    <div class="rounded-2xl border border-blue-100 p-4">
                        <p class="text-sm text-blue-900 font-semibold mb-3">All readings</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div
                                v-for="body in waterBodies"
                                :key="body.id"
                                class="border border-blue-50 rounded-xl p-4 bg-white shadow-sm"
                            >
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-blue-900 font-semibold">{{ body.name }}</p>
                                        <p class="text-xs text-gray-500">{{ body.type }} &middot; {{ body.location }}</p>
                                    </div>
                                    <p class="text-sm font-semibold text-blue-600">{{ body.level.toFixed(2) }} m</p>
                                </div>
                                <p class="text-xs mt-2" :class="body.statusColor">{{ body.status }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full lg:basis-1/5 space-y-6">
                <div class="flex flex-col bg-white rounded-2xl p-6 shadow-md border border-blue-100 items-center justify-start">
                    <div class="frame_style">
                        <NuxtImg src="/images/kaplya.png" width="28" height="28" alt="Water drop icon" />
                    </div>
                    <p class="text-center text-sm text-blue-600">Select a water body to update the dashboard.</p>
                </div>
                <div class="w-full max-w-md mx-auto bg-gray-50 rounded-2xl shadow-2xl overflow-hidden">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-sm font-medium text-gray-700">All Water Bodies</h2>
                        </div>
                        <div class="max-h-80 overflow-y-auto">
                            <button
                                v-for="body in waterBodies"
                                :key="body.id"
                                @click="selectBody(body.id)"
                                :class="[
                                    'w-full px-6 py-4 flex items-center gap-3 transition-colors text-left border-b border-gray-100 last:border-b-0',
                                    body.id === selectedBodyId ? 'bg-blue-50' : 'bg-white hover:bg-blue-50'
                                ]"
                            >
                                <span class="text-sm text-blue-600 font-medium">{{ body.name }}</span>
                                <span class="text-xs text-gray-500 ml-auto">{{ body.level.toFixed(2) }} m</span>
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
    @apply w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center;
}
</style>
