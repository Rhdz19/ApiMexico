import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerPage } from '../explore-container/explore-container.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerPage]
})
export class Tab2Page {

  constructor() {}

}
