import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private api: HttpClient, private toast: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, send a refresh request to get a new token
          return this.api.get<any>('/refresh').pipe(
            switchMap((response) => {
              // Update the token in localStorage
              localStorage.setItem('token', response.data.token);
              // Clone the original request and add the new token to the headers
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });
              // Resend the original request with the new token
              return next.handle(newRequest);
            }),
            catchError(() => {
              // Redirect to the login page if an error occurs during the refresh request
              window.location.href = '/login';
              return throwError(error);
            })
          );
        } else {
          this.toast.error(error.error.message);
          return throwError(error);
        }
      })
    );
  }
}
