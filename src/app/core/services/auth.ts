import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
    get token(): string | null { return localStorage.getItem('access_token'); }
  setToken(t: string) { localStorage.setItem('access_token', t); }
  clear() { localStorage.removeItem('access_token'); }
}
