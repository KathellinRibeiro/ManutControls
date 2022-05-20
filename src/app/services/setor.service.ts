import { Injectable } from '@angular/core';
import { Setor } from 'src/models/setor';
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
export class SetorService {

  API: string = 'http://manutcontrol.us-east-1.elasticbeanstalk.com/api/v1';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', window.sessionStorage.getItem("x-access-token").trim());
  
  constructor(private httpClient: HttpClient) { }

  adicionalSetor(data: Setor): Observable<Setor> {
    let API_URL = `${this.API}/setor`;
    delete data._id;
    return this.httpClient.post<Setor>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  getSetores(): Observable<Setor[]> {
    return this.httpClient.get<Setor[]>(`${this.API}/setor`, { headers: this.httpHeaders });
  }

  updateSetor(id: string, data: Setor): Observable<Setor> {
    let API_URL = `${this.API}/setor/${id}`;
    return this.httpClient.put<Setor>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  deleteSetor(id: string): Observable<string> {
    let API_URL = `${this.API}/setor/${id}`
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
