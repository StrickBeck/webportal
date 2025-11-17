import { ref,reactive } from "vue";
import axios from 'axios'


export class LakeData {
    name: string;
    lat: number;
    lng: number;
    id: number;
    status: string;
    temperature: number | null;
    humidity: number | null;
    windSpeed: number | null;

    constructor(name: string = '', lat: number = 0, lng: number = 0, id: number = 0, status: string = '') {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.id = id;
        this.status = status;
        this.temperature = null;
        this.humidity = null;
        this.windSpeed = null;
        this.setAxios();
    }

    async setAxios(): Promise<void> {
        try {
            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
            );
            const data = response.data.current;
            this.temperature = data.temperature_2m;
            this.humidity = data.relative_humidity_2m;
            this.windSpeed = data.wind_speed_10m;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.temperature = null;
            this.humidity = null;
            this.windSpeed = null;
        }
    }
}