import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpRequestsInterceptor } from './http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * This file is for providing interceptors dynamically in module
 * All interceptors add here will register in app.module
 * @export
 * @const httpInterceptorsProvider
 */
export const httpInterceptorsProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestsInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
]
