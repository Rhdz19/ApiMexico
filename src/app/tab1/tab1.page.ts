import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerPage } from '../explore-container/explore-container.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteService } from '../services/autocomplete.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewChild, AfterViewInit } from '@angular/core';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerPage, FormsModule, CommonModule, HttpClientModule],
  providers: [HttpClient]

})


export class Tab1Page implements OnInit {
  @ViewChild('searchBar') searchBar: any;

  /**
   * CORRECCION :
   * 1: Las variables declaradas como propiedad de una clase, deben seguir el formato  SNAKE_CASE, solo las variables en constructor o paquetes importados
   *    deben usar CamelCase
   * 2: Las variables deben estar tipadas
   */
  searchTerm: string = "";
  autocompleteOptions: any[] = [];
  timer: any;

  constructor(private AutocompleteService: AutocompleteService) { }
  ngOnInit() { }


  onSearchChange(event: any) {

    clearTimeout(this.timer);

    if (this.searchTerm.length >= 3) {
      this.timer = setTimeout(() => {

        /**
         * CORRECCION:
         * 1: Cambiar el uso de subscribe de un Observable a then de Promise
         * 2: results: any[], debe tener tipado
         *    Ejemplo: results : location_prediction[]
         */
        this.AutocompleteService.searchLocation(this.searchTerm).subscribe((results: any[]) => {
          this.autocompleteOptions = results;
        });
      }, 4000);

    } else {
      this.autocompleteOptions = [];

    }
  }


}
