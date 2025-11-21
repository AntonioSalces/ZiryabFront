import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    onAuthStateChanged(this.auth, user => {
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/dashboard']);
  }

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/dashboard']);
  }
 //no esta implementado el logout en la interfaz pero lo agrego para tenerlo listo
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
//para el guards
  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  get currentUser() {
    return this.userSubject.value;
  }
}