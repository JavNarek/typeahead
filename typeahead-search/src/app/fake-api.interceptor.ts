import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { FAKE_DATA } from './fake-db.constant';

export function fakeApiInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (request.url.includes('/api/fake-data')) {
    const query = request.params.get('query')?.toLowerCase() ?? '';
    const filteredItems = FAKE_DATA.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
    return of(new HttpResponse({ status: 200, body: filteredItems })).pipe(
      delay(500)
    );
  }
  return next(request);
}
