import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { map, tap } from "rxjs";
import { CommonService } from "./common.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('shoppingtoken') ? localStorage.getItem('shoppingtoken') as string: ""

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    //req.headers.append('Authorization', 'Bearer ' + authToken);
    if (!authToken) {
        return next.handle(req);
      }
      const modifiedReq = req.clone({
        headers: req.headers             // <-- append to existing `headers` in `req`
          .append('Authorization', 'Bearer ' + authToken)
      });

    // send cloned request with header to the next handler.
    return next.handle(modifiedReq).pipe( tap(() => {},
    (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
          return;
          }

          this.commonService.clearNotLoginData();
          //this.router.navigate(['login']);
        }
      }));
  }
}
