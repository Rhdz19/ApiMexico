import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.page.html',
  styleUrls: ['./explore-container.page.scss'],
  standalone: true,
})
export class ExploreContainerPage {
  @Input() name?: string;
}
