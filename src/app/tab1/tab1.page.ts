import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {ExploreContainerPage } from '../explore-container/explore-container.page';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerPage, FormsModule, CommonModule],
})
export class Tab1Page {
  searchTerm: string = "";
  autocompleteOptions: string[] = [];
  timer: any; 
  constructor(private http: HttpClient) {}

  onSearchChange(event: any) {
    const searchTerm = event.detail.value;

    // Verificar si el campo de búsqueda está vacío
    if (!searchTerm) {
      this.autocompleteOptions = [];
      return;
    }

    // Cancelar solicitudes pendientes anteriores
    clearTimeout(this.timer);

    // Esperar 4 segundos después de que el usuario deja de escribir
    this.timer = setTimeout(() => {
      this.fetchAutocompleteOptions(searchTerm);
    }, 4000);
    console.log( this.autocompleteOptions);
  }

}
