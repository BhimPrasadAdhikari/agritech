import axios from 'axios';

const AGRO_API_BASE = 'https://api.agromonitoring.com/agro/1.0';

export class AgromonitoringService {
  private static instance: AgromonitoringService;
  private apiKey: string;

  private constructor() {
    this.apiKey = process.env.AGRO_APP_ID || '';
    if (!this.apiKey) {
      throw new Error('AGRO_APP_ID environment variable is not set');
    }
  }

  public static getInstance(): AgromonitoringService {
    if (!AgromonitoringService.instance) {
      AgromonitoringService.instance = new AgromonitoringService();
    }
    return AgromonitoringService.instance;
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async getPolygons() {
    try {
      const response = await axios.get(
        `${AGRO_API_BASE}/polygons?appid=${this.apiKey}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching polygons:', error);
      throw error;
    }
  }

  async createPolygon(name: string, coordinates: number[][]) {
    try {
      const response = await axios.post(
        `${AGRO_API_BASE}/polygons?appid=${this.apiKey}`,
        {
          name,
          geo_json: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [coordinates]
            }
          }
        },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating polygon:', error);
      throw error;
    }
  }

  async getFieldData(polygonId: string) {
    try {
      const [ndvi, soil, weather] = await Promise.all([
        this.getNDVIData(polygonId),
        this.getSoilData(polygonId),
        this.getWeatherData(polygonId)
      ]);

      return {
        ndvi,
        soil,
        weather
      };
    } catch (error) {
      console.error('Error fetching field data:', error);
      throw error;
    }
  }

  private async getNDVIData(polygonId: string) {
    const response = await axios.get(
      `${AGRO_API_BASE}/ndvi/history?polyid=${polygonId}&appid=${this.apiKey}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  private async getSoilData(polygonId: string) {
    const response = await axios.get(
      `${AGRO_API_BASE}/soil?polyid=${polygonId}&appid=${this.apiKey}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  private async getWeatherData(polygonId: string) {
    const response = await axios.get(
      `${AGRO_API_BASE}/weather?polyid=${polygonId}&appid=${this.apiKey}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }
} 