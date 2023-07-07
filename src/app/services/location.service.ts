
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}


  /**
   * CORRECCION:
   * 1: Todas las funciones de servicio deben retornar :Promise<T>, Implementar uso de lastValueFrom()
   * 2: Cada funcion debe tener un tipado de retorno.
   * Ejemplo   :  getCountries(): Promise<index_location_countries[]>
   * export interface index_location_countries {
   * country_id : string,
   * name : string
   * }
   *
   * 3: Las interfaces usadas, deben añadirce a la carpeta app/interfaces
   * 4: Las interfaces deben tener un patron de nombre, basado en su uso y tipo de informacion que manejan
   * ejemplos:
   * index => Las monomenclaturas index, se usan para datos usandos en "select, listas etc"
   * types => types se usa para datos de "tipos", ejemplo  "tipos de moneda", "tipos de operacion", "tipos de publicacion" etc..
   * location => location se usa para datos de tipo ubicacion
   *
   * index_location_countries
   * index_location_states
   * index_location_......
   *
   * index_types_items
   * index_types_currency....
   *
   * 5:Validar la respuesta de la api mediante TRY catch y valida que el contenido sea un JSON valido
   *
   * @returns
   */
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
