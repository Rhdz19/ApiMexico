
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  countries: any[] = [];
  selected_country: any;
  global_state: any = "";

  states: any[] = [];
  selected_state: any;

  municipalities: any[] = [];
  selected_municipality: any;
  global_municipality: any = "";

  colonies: any[] = [];
  selected_colony: any;

  cities: any[] = [];
  selected_city: any;

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
    this.locationService.getCountries().subscribe(country_names => {
      this.countries = country_names;
    });
  }

  onCountryChange(event: any) {
    const selected_country = event.detail.value;
    this.selected_country = [selected_country];

    this.locationService.getStates(selected_country.country_id).subscribe((states: any) => {
      this.states = states.states;
      this.selected_state = null;
      this.selected_municipality = null;
      this.selected_city = null;
      this.selected_colony = null;
      this.selected_option_index = 1;
    });
  }

  onStateChange(event: any) {
    const selected_state = event.detail.value;
    this.global_state = selected_state;
    this.selected_state = [selected_state];
    this.locationService.getMunicipalities(selected_state.state_id).subscribe((municipalities: any) => {
      this.municipalities = municipalities.municipalities;
      this.selected_municipality = null;
      this.selected_city = null;
      this.selected_colony = null;
      this.selected_option_index = 2;

    });
  }

  onMunicipalityChange(event: any) {
    const selected_municipality = event.detail.value;
    this.selected_municipality = [selected_municipality];
    this.global_municipality = selected_municipality.name
    this.locationService.getColonies(selected_municipality.municipality_id).subscribe((colonies: any) => {
      this.colonies = colonies.colonies;
      this.selected_city = null;
      this.selected_option_index = 3;

    });
  }

  onColonyChange(event: any) {

    const selected_colony = event.detail.value;
    this.selected_colony = [selected_colony];

    this.locationService.getCities(selected_colony.state_id).subscribe((cities: any) => {
      this.cities = cities.cities;

      const matching_colony = findMatchingColony(this.colonies, selected_colony.name);
      function findMatchingColony(colonies: any[], selected_colony: string): any | undefined {
        for (const colony of colonies) {
          if (colony.name === selected_colony) {
            return colony;
          }
          if (colony.colonies && colony.colonies.length > 0) {
            const matching_colony = findMatchingColony(colony.colonies, selected_colony);
            if (matching_colony) {
              return matching_colony;
            }
          }
        }
        return undefined;
      }
      if (matching_colony) {

        this.cities = [matching_colony];


      } else {
        console.log("Sin colonias coincidentes");
      }
    });

    this.selected_option_index = 4;

  }

}


