import { Component, Input } from '@angular/core';

import { Bier } from '../../../models/bier.interface';

@Component({
  selector: 'app-bier-detail',
  templateUrl: './bier-detail.component.html',
  styleUrls: ['./bier-detail.component.scss'],
})
export class BierDetailComponent {

  @Input()
  detail: Bier; 

  placeholder: string = "../assets/img/bier-dog-bottle.png";

  constructor() { }

}
