import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, lastValueFrom, of } from 'rxjs';
import { index_location_auto_complete } from '../interfaces/mexicoInterface';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {

  apiUrl = 'https://api.m2mexico.com/api/resources/location/predict/?location=cancun';

  constructor(private http: HttpClient) {}

  async searchLocation(query: string): Promise<index_location_auto_complete[]> {
    if (!query) {
      return [];
    }
    try {
      const response = await lastValueFrom(this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
        debounceTime(4000),
        distinctUntilChanged()
      ));

      let jsonData: index_location_auto_complete;
      try {
        jsonData = JSON.parse(response);
      } catch (error) {
        throw new Error('Formato de JSON invalido');
      }

      if (Array.isArray(jsonData)) {
        return jsonData as index_location_auto_complete[];
      } else {
        throw new Error('Formato de JSON invalido');
      }
    } catch (error) {
      throw new Error('Error al obtener la informacion: ' + error);
    }
  }
}
