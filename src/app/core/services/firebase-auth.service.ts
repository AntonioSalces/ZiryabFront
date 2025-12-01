import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private auth = getAuth();

  constructor(private http: HttpClient) {}

  // LOGIN: envía email/password al backend
  async login(email: string, password: string) {
    const response = await this.http
      .post<{ idToken: string; uid: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .toPromise();

    if (response?.idToken) {
      await signInWithCustomToken(this.auth, response.idToken);
      localStorage.setItem('idToken', response.idToken);
      localStorage.setItem('uid', response.uid);
      return response; // ← AGREGA ESTO
    }
    throw new Error('No idToken received'); // ← O lanza error
  }

  // REGISTER: envía email/password al backend
  async register(email: string, password: string) {
    const response = await this.http
      .post<{ idToken: string; uid: string }>(`${this.apiUrl}/register`, {
        email,
        password,
      })
      .toPromise();

    if (response?.idToken) {
      await signInWithCustomToken(this.auth, response.idToken);
      localStorage.setItem('idToken', response.idToken);
      localStorage.setItem('uid', response.uid);
      return response; // ← AGREGA ESTO
    }
    throw new Error('No idToken received'); // ← O lanza error
  }

  // LOGOUT
  async logout() {
    await this.auth.signOut();
    localStorage.removeItem('idToken');
    localStorage.removeItem('uid');
  }

  // Obtener token actual
  getToken(): string | null {
    return localStorage.getItem('idToken');
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
