import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Bier } from "../../../models/bier.interface";

@Component({
  selector: "app-bier-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./bier-detail.component.html",
  styleUrls: ["./bier-detail.component.scss"],
})
export class BierDetailComponent {
  @Input()
  detail: Bier;

  placeholder: string = "../assets/img/bier-dog-bottle.png";

  constructor() {}

  get image(): string {
    if (this.detail.image_url) {
      return this.detail.image_url;
    } else {
      return this.placeholder;
    }
  }
}
