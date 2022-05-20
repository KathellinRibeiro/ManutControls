import { Injectable } from '@angular/core';
import { Equipament } from 'src/models/equipamento';
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
export class EquipamentoService {

  API: string = 'http://manutcontrol.us-east-1.elasticbeanstalk.com/api/v1';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', window.sessionStorage.getItem("x-access-token"));

  constructor(private httpClient: HttpClient) { }

  adicionalEquipamento(data: Equipament): Observable<Equipament> {
    let API_URL = `${this.API}/equipamento`;
    delete data._id;
    return this.httpClient.post<Equipament>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  getEquipamentos(): Observable<Equipament[]> {
    return this.httpClient.get<Equipament[]>(`${this.API}/equipamento`, { headers: this.httpHeaders });
  }

  updateEquipamento(id: string, data: Equipament): Observable<Equipament> {
    let API_URL = `${this.API}/equipamento/${id}`;
    return this.httpClient.put<Equipament>(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  deleteEquipamento(id: string): Observable<string> {
    let API_URL = `${this.API}/equipamento/${id}`
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
