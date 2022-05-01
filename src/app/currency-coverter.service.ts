import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyCoverterService {
  private exchangeRatesAPI = `http://api.exchangeratesapi.io/v1/latest?access_key=${environment.EXCHANGE_RATE_API_SECRET_KEY}&format=1`;
  public exchangeRatesLocalStorageKey = 'exchangeRates';
  constructor(private http: HttpClient) {}
  public isCurrentDate(date: any) {
    return (
      new Date(date).setHours(0, 0, 0, 0) ==
      new Date(new Date().toISOString().split('T')[0]).setHours(0, 0, 0, 0)
    );
  }

  public getCurrencyAbbreviations() {
    return this.http.get('assets/currency-abbreviations.json');
  }

  public getExchangeRates() {
    return new Observable((subscriber) => {
      const cachedExchangeRates = localStorage.getItem(
        this.exchangeRatesLocalStorageKey
      );
      if (
        cachedExchangeRates == null ||
        !this.isCurrentDate(JSON.parse(cachedExchangeRates).date)
      ) {
        this.http.get(this.exchangeRatesAPI).subscribe(
          (response: any) => {
            localStorage.setItem(
              this.exchangeRatesLocalStorageKey,
              JSON.stringify(response)
            );
            subscriber.next(response);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        subscriber.next(JSON.parse(cachedExchangeRates));
      }
    });
  }
}
