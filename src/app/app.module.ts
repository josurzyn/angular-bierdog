import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

// Angular Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BiersComponent } from "./containers/biers/biers.component";
import { AboutComponent } from "./components/about/about.component";
import { BierDetailComponent } from "./components/bier-detail/bier-detail/bier-detail.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { RemoveSpacePipe } from "./pipes/remove-space.pipe";

@NgModule({
  declarations: [
    AppComponent,
    BiersComponent,
    AboutComponent,
    BierDetailComponent,
    FiltersComponent,
    RemoveSpacePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
