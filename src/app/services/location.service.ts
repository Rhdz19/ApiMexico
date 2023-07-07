
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

 

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>('https://api.m2mexico.com/api/resources/countries');
  }

  getStates(countryId: number ): Observable<any[]> {
    return this.http.get<any[]>(`https://api.m2mexico.com/api/resources/states/${countryId}`);
  }

  getMunicipalities(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://api.m2mexico.com/api/resources/municipalities/${stateId}`);
  }


  getColonies(municipalityId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://api.m2mexico.com/api/resources/colonies/${municipalityId}`);
  }

  getCities(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://api.m2mexico.com/api/resources/cities/${stateId}`);
  }


}
