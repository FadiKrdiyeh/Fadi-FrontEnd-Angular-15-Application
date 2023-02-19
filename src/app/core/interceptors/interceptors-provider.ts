import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpRequestsInterceptor } from './http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
