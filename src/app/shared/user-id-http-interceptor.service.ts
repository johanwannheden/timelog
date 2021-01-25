import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCurrentUserId} from '../state/status.selectors';

@Injectable()
export class UserIdHttpInterceptorService implements HttpInterceptor {

    private userId: string | undefined;

    constructor(private store: Store) {
        this.store.select(selectCurrentUserId).subscribe(user => this.userId = user);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.userId) {
            const userRequest = request.clone({setHeaders: {'x-user-id': this.userId}});
            return next.handle(userRequest);
        }
        return next.handle(request);
    }
}
