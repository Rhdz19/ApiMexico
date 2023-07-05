import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {ExploreContainerPage } from '../explore-container/explore-container.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteService } from '../services/autocomplete.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerPage, FormsModule, CommonModule, HttpClientModule],
  providers:[HttpClient]
})
export class Tab1Page {
  searchTerm: string = "";
  autocompleteOptions: string[] = [];
  timer: any; 
  constructor(private auto_complete_Service: AutocompleteService) {}

  onSearchChange(event: any) {
    const searchTerm = event.detail.value;
  
    // Verificar si el campo de búsqueda está vacío
    if (!searchTerm) {
      this.autocompleteOptions = [];
      return;
    }
  
    // Cancelar solicitudes pendientes anteriores
    clearTimeout(this.auto_complete_Service.timer);
  
    // Esperar 4 segundos después de que el usuario deja de escribir
    this.auto_complete_Service.timer = setTimeout(() => {
      this.auto_complete_Service.fetchAutocompleteOptions(searchTerm).subscribe(response => {
        this.autocompleteOptions = response.options;
      });
    }, 4000);
  }



}
