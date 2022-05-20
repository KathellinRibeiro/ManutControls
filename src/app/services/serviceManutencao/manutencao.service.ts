import { Injectable } from '@angular/core';
import { Manutencoes } from 'src/models/Manutencoes';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {

  API: string = 'http://manutcontrol.us-east-1.elasticbeanstalk.com/api/v1';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', window.sessionStorage.getItem("x-access-token"));

  constructor(private httpClient: HttpClient) { }

  adicionalManutencao(data: Manutencoes): Observable<Manutencoes> {
    let API_URL = `${this.API}/manutencao`;
    delete data._id;
    return this.httpClient.post<Manutencoes>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  getManutencoes(): Observable<Manutencoes[]> {
    return this.httpClient.get<Manutencoes[]>(`${this.API}/manutencao`, { headers: this.httpHeaders });
  }

  updateManutencao(id: string, data: Manutencoes): Observable<Manutencoes> {
    let API_URL = `${this.API}/manutencao/${id}`;
    return this.httpClient.put<Manutencoes>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  deleteManutencao(id: string): Observable<string> {
    let API_URL = `${this.API}/manutencao/${id}`
    return this.httpClient.delete<string>(API_URL, { headers: this.httpHeaders}).pipe(catchError(this.handleError))
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
