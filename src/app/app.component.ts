import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteService } from './services/autocomplete.service';
import { LocationService } from './services/location.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AutocompleteService, LocationService]

})
export class AppComponent {


  constructor() {}
}
