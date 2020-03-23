import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  BASE_URL = 'https://api.kawalcorona.com';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDataIndonesia(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/indonesia', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getDataPerProvinsi(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/indonesia/provinsi', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getDataGlobal(): Observable<any> {
    return this.http.get<any>(this.BASE_URL, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getDataGlobalPrositif(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/positif', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getDataGlobalSembuh(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/sembuh', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getDataGlobalMeninggal(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/meninggal', this.httpOptions)
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
