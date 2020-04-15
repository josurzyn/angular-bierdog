import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BiersService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "https://api.punkapi.com/v2/beers";

  getBiers() {
    return this.http.get(`${this.baseUrl}?per_page=50`);
  }

  getRandomBier() {
    return this.http.get(`${this.baseUrl}/random`);
  }

  getByFilters(params: string) {
    return this.http.get(`${this.baseUrl}?${params}`);
  }
}
