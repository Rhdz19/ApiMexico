import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  searchLocation(query: string): Observable<any[]> {
    if (!query) {
      return of([]);
    }

    return this.http
      .get<any>(`https://api.m2mexico.com/api/resources/location/predict/?location=cancun`)
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(response => of(response.map((item: { full_location: any; }) => item.full_location)))
      );
  }
}
