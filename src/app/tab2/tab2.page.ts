// import { Component } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { ExploreContainerPage } from '../explore-container/explore-container.page';

// @Component({
//   selector: 'app-tab2',
//   templateUrl: 'tab2.page.html',
//   styleUrls: ['tab2.page.scss'],
//   standalone: true,
//   imports: [IonicModule, ExploreContainerPage]
// })
// export class Tab2Page {

//   constructor() {}

// }
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-location-select',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule]
})
export class Tab2Page implements OnInit {
  countries: any[] = [];
  selectedCountry: any;

  states: any[] = [];
  selectedState: any;

  municipalities: any[] = [];
  selectedMunicipality: any;

  cities: any[] = [];
  selectedCity: any;

  colonies: any[] = [];
  selectedColony: any;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.locationService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  onCountryChange() {
    this.locationService.getStates(this.selectedCountry.id).subscribe((states) => {
      this.states = states;
      this.selectedState = null;
      this.selectedMunicipality = null;
      this.selectedCity = null;
      this.selectedColony = null;
    });
  }

  onStateChange() {
    this.locationService.getMunicipalities(this.selectedState.id).subscribe((municipalities) => {
      this.municipalities = municipalities;
      this.selectedMunicipality = null;
      this.selectedCity = null;
      this.selectedColony = null;
    });
  }

  onMunicipalityChange() {
    this.locationService.getCities(this.selectedMunicipality.id).subscribe((cities) => {
      this.cities = cities;
      this.selectedCity = null;
      this.selectedColony = null;
    });
  }

  onCityChange() {
    this.locationService.getColonies(this.selectedCity.id).subscribe((colonies) => {
      this.colonies = colonies;
      this.selectedColony = null;
    });
  }
}

