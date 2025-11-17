<template>
    <div class="w-full h-full items-center justify-center p-4 lg:p-16 space-y-6">
        <div class="h-16"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(value,index) in optine" :key="index" class="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100">
                <div class="frame_style"></div>
                <div>
                    <p class="text-sm text-blue-600">{{ value.name }}</p>
                    <p class="text-2xl text-blue-900">{{ value.count }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-6 w-full justify-center">
            <div class="w-full lg:basis-3/4 bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div class="h-full w-full">
                <div style="height:600px;width:1330px" >
                <LMap :zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false">
                <LTileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"/>
                <LMarker :lat-lng="petropavl" @click="zoomToMarker(petropavl[0], petropavl[1])">
                    <LTooltip permanent direction="top">Petropavlosk (NKR)</LTooltip>
                    <LPopup>Petropavlosk, North Kazakhstan Region</LPopup>
                </LMarker>
                <LMarker v-for="(lake,i) in lakes" :key="i"
                :lat-lng="[lake.lat,lake.lng]"
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
            </div>
            <div class="flex flex-col w-full lg:basis-1/5 space-y-6">
                <div class="flex flex-col bg-white rounded-2xl p-6 shadow-md border border-blue-100 items-center justify-start">
                <div class="frame_style"></div>
                <p class="text-center text-wrap text-sm text-blue-600">Select a marker on the map to view details</p>
                </div>
                <div class="w-full max-w-md mx-auto bg-gray-50 rounded-2xl shadow-2xl overflow-hidden">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-sm font-medium text-gray-700">All Water Bodies</h2>
                        </div>
                        <div class="max-h-80 overflow-y-auto">
                            <button v-for="body in lakes" :key="body.id" 
                            @click="zoomToMarker(body.lat, body.lng)"
                            class="w-full px-6 py-4 flex items-center gap-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-400 last:border-b-0">
                                <span class="text-sm text-blue-600 font-medium">{{ body.name }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>        
        </div>

    </div>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {LMap,LTileLayer,LMarker,LTooltip,LPopup} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css'

type LatLngTuple = [number,number]

interface Lake{
    name:string,
    lat:number,
    lng:number,
    id:number,
    status:string
}
const lakes = ref<Lake[]>([
    { name: 'Озеро Пестрое', lat: 54.836699, lng: 69.111328 ,id:1,status:'lake'},
    { name: 'Озеро Белое', lat: 54.927154, lng: 69.254322 ,id:2,status:'lake'},
    { name: 'Озеро Горькое', lat: 54.947573, lng: 68.951122 ,id:3,status:'lake'},
    { name: 'Озеро Поганка', lat: 54.921209, lng: 69.053476 ,id:4,status:'lake'},
    { name: 'Озеро Дикое', lat: 54.840156, lng: 69.131957 ,id:5,status:'lake'},
    { name: 'Ishim' , lat:54.893110,lng:69.127836,id:6,status:'river'}
])

const petropavl = ref<LatLngTuple>([54.88,69.16])

const mapCenter = ref<LatLngTuple>([54.88,69.16])
const mapZoom = ref(11)

const optine = ref([
    {
        name:"Total Water Body",
        count:lakes.value.length
    },
    {
        name:"Revers",
        count:lakes.value.filter(lake => lake.status === 'river').length
    },
    {
        name:"Lakes & Reservoirs",
        count:lakes.value.filter(lake => lake.status === 'lake').length
    }
])

// zoom
const zoomToMarker = (lat: number, lng: number) => {
    mapCenter.value = [lat, lng]
    mapZoom.value = 14
}
</script>

<style>
.frame_style{
    @apply w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center;
}
</style>