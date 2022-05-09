import { Injectable } from '@angular/core';
import { Login } from 'src/models/login';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string = 'http://manutcontrol.us-east-1.elasticbeanstalk.com/api/v1';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private httpClient: HttpClient) { }

  getLogin(login: Login): Observable<Login> {
    let API_URL = `${this.API}/login`;
    return this.httpClient.post<Login>(API_URL, login, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
