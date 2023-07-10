
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { index_location_country, index_location_state, index_location_Municipality, index_location_Colony, index_location_city } from '../interfaces/mexicoInterface';
@Component({
  selector: 'app-location-select',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [LocationService]
})

/**
 * CORRECCION: Aplicar todas las correcciones de tab 1
 * tipado, snake_case, uso de promesas
 */

export class Tab2Page implements OnInit {

  is_button_disabled: boolean = true;

  my_form: FormGroup = new FormGroup({});

  selected_option_index: number = 0;

  countries: index_location_country[] = [];
  selected_country: string="";
  global_state: string = "";

  states?: index_location_state;
  selected_state: string = "";

  municipalities?: index_location_Municipality;
  selected_municipality: string = "";
  global_municipality: string = "";

  colonies?: index_location_Colony;
  selected_colony: string = "";

cities?: index_location_city ;
  selected_city: string = "";
  

  constructor(private locationService: LocationService, public formBuilder: FormBuilder,private alertController: AlertController) {
     
  }

  ngOnInit() {
    this.loadCountries();
    this.my_form = this.formBuilder.group({
      country_form:['',[Validators.required]],
      state_form:['',[Validators.required]],
      municipality_form:['',[Validators.required]],
      colony_form:['',[Validators.required]],
    });
  }

  checkFormValidity() {
    this.is_button_disabled = !this.my_form.valid;
  }

  loadCountries() {
    this.locationService.getCountries().then((countries: index_location_country[]) => {
      this.countries = countries;
    }).catch((error: any) => {
      console.error('Error al cargar los paises:', error);
    });
  }
  
  onCountryChange(event: any) {
    const selected_country = event.detail.value;
    this.selected_country = selected_country;
  
    this.locationService.getStates(selected_country.country_id).then((states: index_location_state) => {
      console.log(states)
      this.states = states;
      this.selected_state = "";
      this.selected_municipality = "";
      this.selected_city = "";
      this.selected_colony = "";
      this.selected_option_index = 1;
      console.log(this.states)
      console.log(states.states)
    }).catch((error: any) => {
      console.error('Error al obtener los estados:', error);
    });
  }

  onStateChange(event: any) {
    const selected_state = event.detail.value;
    this.global_state = selected_state;
    this.selected_state = selected_state;
  
    this.locationService.getMunicipalities(selected_state.state_id).then((municipalities: index_location_Municipality) => {
      this.municipalities = municipalities;
      this.selected_municipality = "";
      this.selected_city = "";
      this.selected_colony = "";
      this.selected_option_index = 2;
    }).catch((error: any) => {
      console.error('Error al obtener los municipios:', error);
    });
  }
  
  onMunicipalityChange(event: any) {
    const selected_municipality = event.detail.value;
    this.selected_municipality = selected_municipality;
    this.global_municipality = selected_municipality.name;
  
    this.locationService.getColonies(selected_municipality.municipality_id).then((colonies: index_location_Colony) => {
      this.colonies = colonies;
      this.selected_city = "";
      this.selected_option_index = 3;
    }).catch((error: any) => {
      console.error('Error al obtener las colonias:', error);
    });
  }
  onColonyChange(event: any) {
    const selected_colony = event.detail.value;
    this.selected_colony = selected_colony;
  
    this.locationService.getCities(selected_colony.state_id).then((cities: index_location_city) => {
      this.cities = cities;
  
      const matching_colony = this.findMatchingColony(this.colonies, selected_colony.name);
      if (matching_colony) {
        this.cities = matching_colony;
      } else {
        console.log("Sin colonias coincidentes");
      }
    }).catch((error: any) => {
      console.error('Error al obtener las ciudades:', error);
    });
  
    this.selected_option_index = 4;
  }
  
  findMatchingColony(colonies: any, selected_colony: string): any | undefined {
    for (const colony of colonies) {
      if (colony.name === selected_colony) {
        return colony;
      }
      if (colony.colonies && colony.colonies.length > 0) {
        const matching_colony = this.findMatchingColony(colony.colonies, selected_colony);
        if (matching_colony) {
          return matching_colony;
        }
      }
    }
    return undefined;
  }
  

}


