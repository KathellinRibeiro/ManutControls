import { Injectable } from '@angular/core';
import { Estoque } from 'src/models/Estoque';
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
export class EstoqueService {

  API: string = 'http://manutcontrol.us-east-1.elasticbeanstalk.com/api/v1';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', window.sessionStorage.getItem("x-access-token"));

  constructor(private httpClient: HttpClient) { }

  adicionalEstoque(data: Estoque): Observable<Estoque> {
    let API_URL = `${this.API}/peca`;
    delete data._id;
    return this.httpClient.post<Estoque>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  getEstoques(): Observable<Estoque[]> {
    return this.httpClient.get<Estoque[]>(`${this.API}/peca`, { headers: this.httpHeaders });
  }

  updateEstoque(id: string, data: Estoque): Observable<Estoque> {
    let API_URL = `${this.API}/peca/${id}`;
    return this.httpClient.put<Estoque>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  deleteEstoque(id: string): Observable<string> {
    let API_URL = `${this.API}/peca/${id}`
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
