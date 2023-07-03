import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor() { }

  a
  fetchAutocompleteOptions(searchTerm: string) {

    this.http.get<any>('https://api.m2mexico.com/api/resources/location/predict/?location=cancun', { params: { q: searchTerm } })
      .subscribe(response => {
        this.autocompleteOptions = response.options;

        
      });
  }
}
