import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
  
})
export class AutocompleteService {
  timer: any;
  constructor(private http: HttpClient) { }

  fetchAutocompleteOptions(searchTerm: string) {
    return this.http.get<any>('https://api.m2mexico.com/api/resources/location/predict/?location=cancun', { params: { q: searchTerm } });
  }

}
