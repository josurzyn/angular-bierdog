import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bier } from './bier.interface';

@Injectable({
  providedIn: 'root',
})
export class BiersService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://api.punkapi.com/v2/beers';

  getBiers() {
    return this.http.get<Bier[]>(`${this.baseUrl}?per_page=50`);
  }

  getRandomBier() {
    return this.http.get<Bier[]>(`${this.baseUrl}/random`);
  }

  getByFilters(params: string) {
    return this.http.get<Bier[]>(`${this.baseUrl}?${params}&per_page=50`);
  }
}
