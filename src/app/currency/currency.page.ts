import { Component, OnInit } from '@angular/core';
import { CurrencyCoverterService } from '../currency-coverter.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit {
  public exchangeRates: number;
  public baseCurrency: string;
  public convertCurrencyFrom: string;
  public convertCurrencyTo: string;
  public convertCurrencyFromValue: number;
  public convertCurrencyToValue: number;
  public currencyAbbreviations: Object;

  constructor(private currencyConverterService: CurrencyCoverterService) {
    this.currencyAbbreviations = {};
  }

  ngOnInit() {
    this.currencyConverterService
      .getExchangeRates()
      .subscribe((response: any) => {
        this.exchangeRates = response.rates;
        this.baseCurrency = response.base;
        this.convertCurrencyFromValue = 1;
        this.convertCurrencyFrom = Object.keys(this.exchangeRates)[0];
        this.convertCurrencyTo = Object.keys(this.exchangeRates)[1];
        this.getCurrencyAbbreviations();
      });
  }
  getCurrencyAbbreviations() {
    this.currencyConverterService
      .getCurrencyAbbreviations()
      .subscribe((response: any) => {
        this.currencyAbbreviations = response;
        this.calculateExchangeRates();
      });
  }

  calculateExchangeRates() {
    if (this.convertCurrencyFromValue == null) {
      this.convertCurrencyToValue = null;
    } else {
      this.convertCurrencyToValue =
        (this.convertCurrencyFromValue *
          this.exchangeRates[this.convertCurrencyTo]) /
        this.exchangeRates[this.convertCurrencyFrom];
    }
  }

  calculateReverseExchangeRates() {
    if (this.convertCurrencyToValue == null) {
      this.convertCurrencyFromValue = null;
    } else {
      this.convertCurrencyFromValue =
        (this.convertCurrencyToValue *
          this.exchangeRates[this.convertCurrencyFrom]) /
        this.exchangeRates[this.convertCurrencyTo];
    }
  }
  swap(from, to) {
    this.convertCurrencyFrom = to;
    this.convertCurrencyTo = from;
  }
}
