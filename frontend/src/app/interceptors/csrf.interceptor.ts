
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('csrftoken');
    if (csrfToken && /http:\/\/127\.0\.0\.1:8000\/api\//.test(req.url) && ['POST','PUT','PATCH','DELETE'].includes(req.method)) {
      const authReq = req.clone({
        setHeaders: { 'X-CSRFToken': csrfToken },
        withCredentials: true
      });
      return next.handle(authReq);
    }
    const cloned = req.clone({ withCredentials: true });
    return next.handle(cloned);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '\\s*=\\s*([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}
