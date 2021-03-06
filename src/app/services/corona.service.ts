import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  BASE_URL = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';
  BASE_URL2= 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'coronavirus-monitor.p.rapidapi.com',
      'X-RapidAPI-Key' : 'b7bd1f9509mshbbf2c531d332adap192d86jsnabdf5cf63655'
    })
  }

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "b7bd1f9509mshbbf2c531d332adap192d86jsnabdf5cf63655"
    })
  }

  getDataIndonesia(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/latest_stat_by_country.php?country=Indonesia', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getHistoryIndonesia(){
    return this.http.get<any>(this.BASE_URL + '/cases_by_particular_country.php?country=Indonesia', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }


  getDataGlobal(): Observable<any> {
    return this.http.get<any>(this.BASE_URL+'/worldstat.php', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }


  getAllCountry(): Observable<any> {
    return this.http.get<any>(this.BASE_URL2, this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }


  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
