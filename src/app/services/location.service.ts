
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { index_location_Colony, index_location_Municipality, index_location_city, index_location_country, index_location_state } from '../interfaces/mexicoInterface';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}


  async getCountries(): Promise<index_location_country[]> {
    try {
      const response = await lastValueFrom(this.http.get<index_location_country[]>('https://api.m2mexico.com/api/resources/countries'));
      this.validateJsonResponse(response);
      return response;
    } catch (error) {
      throw new Error('Error del servicio al traer los países');
    }
  }
  
  async getStates(country_id: number): Promise<index_location_state> {
    try {
      const response = await lastValueFrom(this.http.get<index_location_state>(`https://api.m2mexico.com/api/resources/states/${country_id}`));
      this.validateJsonResponse(response);
      return response;
    } catch (error) {
      throw new Error('Error del servicio al traer los estados');
    }
  }
  
  async getMunicipalities(state_id: number): Promise<index_location_Municipality> {
    try {
      const response = await lastValueFrom(this.http.get<index_location_Municipality>(`https://api.m2mexico.com/api/resources/municipalities/${state_id}`));
      this.validateJsonResponse(response);
      return response;
    } catch (error) {
      throw new Error('Error del servicio al traer los municipios');
    }
  }
  
  async getColonies(municipality_id: number): Promise<index_location_Colony> {
    try {
      const response = await lastValueFrom(this.http.get<index_location_Colony>(`https://api.m2mexico.com/api/resources/colonies/${municipality_id}`));
      this.validateJsonResponse(response);
      return response;
    } catch (error) {
      throw new Error('Error del servicio al traer las colonias');
    }
  }
  
  async getCities(state_id: number): Promise<index_location_city> {
    try {
      
      const response = await lastValueFrom(this.http.get<index_location_city>(`https://api.m2mexico.com/api/resources/cities/${state_id}`));
      this.validateJsonResponse(response);

      return response;
    } catch (error) {
      throw new Error('Error del servicio al traer las ciudades');
    }
  }
  
  private validateJsonResponse(response: any): void {
    try {
      JSON.parse(JSON.stringify(response));
    } catch (error) {
      throw new Error('JSON con formato invalido');
    }
  }
  



}
