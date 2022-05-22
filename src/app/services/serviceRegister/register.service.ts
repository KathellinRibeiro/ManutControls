import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario';
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

export class RegisterService{
    API: string = 'http://manutcontrol.us-east-1.elasticbeanstalk.com/api/v1';

    constructor(private httpClient: HttpClient) { }

    registraUsuario(data: Usuario): Observable<Usuario> {
        let API_URL = `${this.API}/funcionario`;
        return this.httpClient.post<Usuario>(API_URL, data).pipe(catchError(this.handleError));
    }

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
