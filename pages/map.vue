<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <main class="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <section class="space-y-6">
        <div class="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl sm:p-7">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-2">
              <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Geoportal</p>
              <h1 class="text-3xl font-semibold text-white sm:text-4xl">Water bodies map</h1>
              <p class="text-sm text-slate-300">Select a marker to focus the map and view coordinates instantly.</p>
            </div>
            <div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
              <NuxtImg src="/images/kaplya.png" alt="Water drop" width="24" height="24" class="h-6 w-6" />
              <span>Live positions</span>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="card in stats"
            :key="card.label"
            class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-slate-950 bg-blue-400">
              <NuxtImg :src="card.icon" :alt="`${card.label} icon`" width="26" height="26" class="h-6 w-6" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.15em] text-slate-300">{{ card.label }}</p>
              <p class="text-2xl font-semibold text-white">{{ card.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="grid items-start gap-6 lg:grid-cols-[1.15fr_0.65fr]">
        <div class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Interactive map</p>
              <p class="text-lg font-semibold text-white">Tap markers to zoom in</p>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-300">
              <span class="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                <span class="h-2 w-2 rounded-full bg-sky-400"></span>
                Lake
              </span>
              <span class="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                River
              </span>
            </div>
          </div>
          <div class="h-[420px] w-full sm:h-[520px] lg:h-[600px]">
            <LMap :zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false" class="h-full w-full">
              <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

              <LMarker :lat-lng="petropavl" @click="zoomToMarker(petropavl[0], petropavl[1])">
                <LTooltip permanent direction="top">Petropavlosk (NKR)</LTooltip>
                <LPopup>Petropavlosk, North Kazakhstan Region</LPopup>
              </LMarker>

              <LMarker
                v-for="lake in lakes"
                :key="lake.id"
                :lat-lng="[lake.lat, lake.lng]"
                :draggable="false"
                @click="zoomToMarker(lake.lat, lake.lng)">
                <LTooltip permanent direction="top">{{ lake.name }}</LTooltip>
                <LPopup>
                  <strong>{{ lake.name }}</strong><br />
                  Coordinates: {{ lake.lat }}, {{ lake.lng }}
                </LPopup>
              </LMarker>
            </LMap>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400 text-slate-950">
              <NuxtImg src="/images/kaplya.png" width="26" height="26" alt="Water drop icon" class="h-6 w-6" />
            </div>
            <p class="text-sm text-slate-200">Choose a marker to zoom in and verify precise coordinates.</p>
          </div>

          <div id="water-bodies" class="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl">
            <div class="flex items-center justify-between gap-2 border-b border-white/10 px-6 py-4">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Inventory</p>
                <p class="text-lg font-semibold text-white">Water bodies</p>
              </div>
              <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-white/10">{{ lakes.length }} total</span>
            </div>
            <div class="divide-y divide-white/5 overflow-y-auto max-h-[520px]">
              <button
                v-for="body in lakes"
                :key="body.id"
                @click="zoomToMarker(body.lat, body.lng)"
                class="group flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition hover:bg-white/5">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <NuxtImg :src="getStatusIcon(body.status)" width="22" height="22" class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-white group-hover:text-white">{{ body.name }}</p>
                    <p class="text-xs text-slate-400">Lat {{ body.lat.toFixed(2) }}, Lng {{ body.lng.toFixed(2) }}</p>
                  </div>
                </div>
                <span :class="['inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1', getStatusBadge(body.status)]">
                  {{ statusLabel(body.status) }}
                </span>
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>


  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { LakeData, lakes } from '~/components/data'

type LatLngTuple = [number, number]

const petropavl = ref<LatLngTuple>([54.88, 69.16])
const mapCenter = ref<LatLngTuple>([54.88, 69.16])
const mapZoom = ref(11)

const statusIconMap: Record<string, string> = {
  river: '/images/river.png',
  lake: '/images/lake.png',
  default: '/images/kaplya.png'
}

const statusBadgeMap: Record<string, string> = {
  river: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/40',
  lake: 'bg-sky-500/15 text-sky-200 ring-sky-400/40',
  default: 'bg-white/10 text-white ring-white/20'
}

const statusLabelMap: Record<string, string> = {
  river: 'River',
  lake: 'Lake'
}

const stats = computed(() => [
  { label: 'Total water bodies', value: lakes.length, icon: '/images/kaplya.png' },
  {
    label: 'Rivers',
    value: lakes.filter(lake => lake.status === 'river').length,
    icon: '/images/river.png'
  },
  {
    label: 'Lakes & reservoirs',
    value: lakes.filter(lake => lake.status === 'lake').length,
    icon: '/images/lake.png'
  }
])

const zoomToMarker = (lat: number, lng: number) => {
  mapCenter.value = [lat, lng]
  mapZoom.value = 13
}

const getStatusIcon = (status: LakeData['status']) => statusIconMap[status] ?? statusIconMap.default
const getStatusBadge = (status: LakeData['status']) => statusBadgeMap[status] ?? statusBadgeMap.default
const statusLabel = (status: LakeData['status']) => statusLabelMap[status] ?? 'Water body'
</script>
