
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-location-select',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [LocationService]
})
export class Tab2Page implements OnInit {

  isButtonDisabled: boolean = true;

  myForm: FormGroup = new FormGroup({});

  selectedOptionIndex: number = 0;

  countries: any[] = [];
  selectedCountry: any;
  globalState: any = "";

  states: any[] = [];
  selectedState: any;

  municipalities: any[] = [];
  selectedMunicipality: any;
  globalMunicipality: any = "";

  colonies: any[] = [];
  selectedColony: any;

  cities: any[] = [];
  selectedCity: any;

  constructor(private locationService: LocationService, public formBuilder: FormBuilder,private alertController: AlertController) {
     }

  ngOnInit() {
    this.loadCountries();
    this.myForm = this.formBuilder.group({

      countryForm:['',[Validators.required]],
      stateForm:['',[Validators.required]],
      municipalityForm:['',[Validators.required]],
      colonyForm:['',[Validators.required]],
  
    });
    
  }
  
  checkFormValidity() {
    this.isButtonDisabled = !this.myForm.valid;
  }

  loadCountries() {
    this.locationService.getCountries().subscribe(countryNames => {
      this.countries = countryNames;
    });

  }
  
  
  onCountryChange(event: any) {

    const selectedCountry = event.detail.value;
    this.selectedCountry = [selectedCountry];

    this.locationService.getStates(selectedCountry.country_id).subscribe((states: any) => {

      this.states = states.states;

      this.selectedState = null;
      this.selectedMunicipality = null;
      this.selectedCity = null;
      this.selectedColony = null;
      this.selectedOptionIndex = 1;

    });
    
  }

  onStateChange(event: any) {

    const selectedState = event.detail.value;
    this.globalState = selectedState;
    this.selectedState = [selectedState];
    this.locationService.getMunicipalities(selectedState.state_id).subscribe((municipalities: any) => {
      this.municipalities = municipalities.municipalities;
      this.selectedMunicipality = null;
      this.selectedCity = null;
      this.selectedColony = null;
      this.selectedOptionIndex = 2;

    });
  }
  onMunicipalityChange(event: any) {
    const selectedMunicipality = event.detail.value;
    this.selectedMunicipality = [selectedMunicipality];
    this.globalMunicipality = selectedMunicipality.name
    this.locationService.getColonies(selectedMunicipality.municipality_id).subscribe((colonies: any) => {
      this.colonies = colonies.colonies;
      this.selectedCity = null;
      this.selectedOptionIndex = 3;

    });
  }


  onColonyChange(event: any) {

    const selectedColony = event.detail.value;
    this.selectedColony = [selectedColony];

    this.locationService.getCities(selectedColony.state_id).subscribe((cities: any) => {
      this.cities = cities.cities;

      const matchingColony = findMatchingColony(this.colonies, selectedColony.name);
      function findMatchingColony(colonies: any[], selectedColony: string): any | undefined {
        for (const colony of colonies) {
          if (colony.name === selectedColony) {
            return colony;
          }
          if (colony.colonies && colony.colonies.length > 0) {
            const matchingColony = findMatchingColony(colony.colonies, selectedColony);
            if (matchingColony) {
              return matchingColony;
            }
          }
        }
        return undefined;
      }
      if (matchingColony) {

        this.cities = [matchingColony];

       
      } else {
        console.log("Sin colonias coincidentes");
      }
    });

    this.selectedOptionIndex = 4;
    







    
  }


}


