import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerPage } from '../explore-container/explore-container.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteService } from '../services/autocomplete.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { index_location_auto_complete } from '../interfaces/mexicoInterface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerPage, FormsModule, CommonModule, HttpClientModule],
  providers: [HttpClient]
})

export class Tab1Page implements OnInit {
  @ViewChild('search_bar') search_bar: any;

  search_term: string = "";
  auto_complete_options: index_location_auto_complete[] = [];
  timer: ReturnType<typeof setTimeout> | undefined;

  constructor(private autocompleteService: AutocompleteService) { }
  ngOnInit() { }

  async onSearchChange(event: any) {

    clearTimeout(this.timer);

    if (this.search_term.length >= 3) {
      this.timer = setTimeout(() => {
        this.autocompleteService.searchLocation(this.search_term)
          .then((results: index_location_auto_complete[]) => {
            this.auto_complete_options = results;
            console.log(this.auto_complete_options)
          })
          .catch(error => {
            console.error(error); 
          });
      }, 4000);
    }else {
      this.auto_complete_options = [];

    }
  }


}
